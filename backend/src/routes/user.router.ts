import { Router, type Request, type Response } from "express";
import userMiddleware from "../middleware/user.middleware.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";

const userRouter = Router();
const JWT_SECRET = process.env.JWT_SECRET || "";

userRouter.post("/register", async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // Validate
    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    // Check if user exists
    // @ts-ignore
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        message: "User already exists",
      });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await newUser.save();

    // Create JWT
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    // Send response
    res.status(201).json({
      message: "User register",
      token,
      user: {
        id: newUser._id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
      },
    });
  } catch (error: any) {
    console.log("Register error: ", error.message);
    res.status(500).json({
      error: "Server error",
    });
  }
});

userRouter.post("/login", async (req: Request, res: Response) => {
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
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        error: "Invalid credentails",
      });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        error: "Invalid credentails",
      });
    }

    // Create token (expires in 1h for security)
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send the token back to fe
    res.json({
      message: "Login Successfull",
      token,
      user: {
        id: user._id,
        name: user.firstName + user.lastName,
        email: user.email,
      },
    });
  } catch (error: any) {
    console.error("Login Error: ", error.message);
  }
});

userRouter.get(
  "/purchases",
  userMiddleware,
  async (req: Request, res: Response) => {
    const user = (req as any).user;
    const data = await Course.find();
  }
);

userRouter.post("/purchase", userMiddleware, (req: Request, res: Response) => {
  // Note: Should add payment method to this route (in-house or using a provider)
  res.send("Course purchased");
});

export default userRouter;
