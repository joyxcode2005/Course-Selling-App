import { Router, type Request, type Response } from "express";
import adminMiddleware from "../middleware/admin.middleware.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Course from "../models/course.model.js";
import multer from "multer";
import { uploadFile } from "../services/s3service.js";

interface CourseUpdateInput {
  title?: string;
  description?: string;
}

const adminRouter = Router();
const upload = multer();
const JWT_SECRET = process.env.JWT_SECRET || "";

adminRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate (if all the inputs are provided by the body)
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if admin already exists
    // @ts-ignore
    const existingUser = await Admin.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "Admin already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create admin
    const newAdmin = new Admin({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newAdmin.save();

    // Create JWT
    const token = jwt.sign(
      { id: newAdmin._id, email: newAdmin.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response
    res.status(201).json({
      message: "Admin registered",
      token,
    });
  } catch (error: any) {
    console.log("Registered error: ", error.message);
    res.status(500).json({
      message: "Server error",
    });
  }
});

adminRouter.post("/login", async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Validate
    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    // Find user
    // @ts-ignore
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    // Create token (expires in 1h for security)
    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token back to fe
    res.json({
      message: "Login successfull",
      token,
    });
  } catch (error) {}
});

adminRouter.use(adminMiddleware);

adminRouter.post(
  "/course",
  upload.single("image"),
  async (req: Request, res: Response) => {
    const { title, description, price } = req.body;
    const admin = (req as any).admin;
    const file = req.file;

    if (!title || !description || !price || !file) {
      return res.status(400).json({ message: "All fields are required" });
    }

    try {
      // Upload image to S3
      const imageUrl = await uploadFile(file);

      // Create course
      const course = await Course.create({
        adminId: admin.id,
        description,
        imageUrl,
        title,
        price: Number(price),
      });

      return res.status(201).json({
        message: `Course created successfully with the id: ${course._id}`,
        course,
      });
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
);

adminRouter.delete("/course", async (req: Request, res: Response) => {
  const { courseId } = req.query;

  if (!courseId || typeof courseId !== "string") {
    return res.status(400).json({ message: "courseId is required in query" });
  }

  const course = await Course.findById(courseId);
  if (!course) {
    return res.status(404).json({
      message: "Course not found!!",
    });
  }

  try {
    const deleted = await Course.findByIdAndDelete(courseId);

    if (deleted) {
      return res.status(200).json({
        message: `Course with id: ${courseId} has been deleted successfully`,
      });
    } else {
      return res.status(500).json({
        message: "Failed to delete the course",
      });
    }
  } catch (error: any) {
    console.log(error.message);
    return res.status(500).json({
      message: "Failed to delete the course. Internal Server Error",
    });
  }
});

adminRouter.put(
  "/course",
  upload.single("image"),
  async (req: Request, res: Response) => {
    try {
      const { courseId, title, description, price } = req.body;

      if (!courseId) {
        return res
          .status(400)
          .json({ message: "courseId is required to update" });
      }

      // Build the update object dynamically
      const updateData: any = {};

      if (title) updateData.title = title;
      if (description) updateData.description = description;
      if (price) updateData.price = price;

      if (req.file) {
        const imageUrl = await uploadFile(req.file);
        if (imageUrl) updateData.imageUrl = imageUrl;
      }

      const updatedCourse = await Course.findByIdAndUpdate(
        courseId,
        { $set: updateData },
        { new: true }
      );

      if (!updatedCourse) {
        return res.status(404).json({
          message: "Course not found",
        });
      }

      return res.status(200).json({
        message: "Course updated successfully",
        course: updatedCourse,
      });
    } catch (error: any) {
      console.error(error.message);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

adminRouter.get("/course/bulk", async (req: Request, res: Response) => {
  try {
    const courses = await Course.find();
    if (courses.length < 1) {
      return res.status(200).json({
        message: "No courses",
      });
    }

    return res.status(200).json({
      messages: `There are ${courses.length} courses`,
      courses,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

export default adminRouter;
