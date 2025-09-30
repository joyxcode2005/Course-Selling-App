import { Router } from "express";
import adminMiddleware from "../middleware/admin.middleware.js";
import Admin from "../models/admin.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Course from "../models/course.model.js";
import multer from "multer";
import { uploadFile } from "../services/s3service.js";
const adminRouter = Router();
const upload = multer();
const JWT_SECRET = process.env.JWT_SECRET || "";
adminRouter.post("/register", async (req, res) => {
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
        const token = jwt.sign({ id: newAdmin._id, email: newAdmin.email }, JWT_SECRET, { expiresIn: "1h" });
        // Send response
        res.status(201).json({
            message: "Admin registered",
            token,
        });
    }
    catch (error) {
        console.log("Registered error: ", error.message);
        res.status(500).json({
            message: "Server error",
        });
    }
});
adminRouter.post("/login", async (req, res) => {
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
    }
    catch (error) { }
});
adminRouter.use(adminMiddleware);
adminRouter.post("/course", upload.single("image"), async (req, res) => {
    const { title, description, price } = req.body;
    const admin = req.admin;
    const file = req.file;
    console.log("Title: ", title);
    console.log("Description: ", description);
    console.log("Price: ", price);
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
    }
    catch (error) {
        console.error(error.message);
        return res.status(500).json({ message: "Internal server error" });
    }
});
adminRouter.delete("/course", (req, res) => { });
adminRouter.put("/course", (req, res) => { });
adminRouter.get("/course/bulk", (req, res) => { });
export default adminRouter;
//# sourceMappingURL=admin.router.js.map