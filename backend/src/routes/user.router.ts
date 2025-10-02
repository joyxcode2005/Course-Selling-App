import { Router, type Request, type Response } from "express";
import userMiddleware from "../middleware/user.middleware.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import "dotenv/config";
import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import Purchase from "../models/purchase.model.js";
import {
  detectCardBrand,
  isExpiryValid,
  luhnCheck,
} from "../services/payment.js";

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

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    res.status(201).json({
      message: "User registered",
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

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Send the token back to fe
    res.json({
      message: "Login Successfull",
    });
  } catch (error: any) {
    console.error("Login Error: ", error.message);
  }
});

userRouter.use(userMiddleware);

userRouter.get("/purchases", async (req: Request, res: Response) => {
  const user = (req as any).user; // User set by auth middleware

  if (!user) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }

  try {
    // 1. Find all the purchases of this user
    const purchases = await Purchase.find({ userId: user.id });

    // 2. Extract courseIds
    const courseIds = purchases.map((p) => p.courseId);

    // 3. Fetch the course details
    const courses = await Course.find({ _id: { $in: courseIds } });

    // 4. Send back
    res.status(200).json({
      purchases: courses,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
});

userRouter.post("/purchase", async (req: Request, res: Response) => {
  // Note: Should add payment method to this route (in-house or using a provider)
  try {
    const user = (req as any).user; // get user from auth middleware
    if (!user)
      return res.status(401).json({
        message: "Unauthorized",
      });

    const { courseId, card } = req.body;

    if (!courseId) {
      return res.status(400).json({
        message: "Course Id is required",
      });
    }

    if (!card) {
      return res.status(400).json({
        message: "Card details required",
      });
    }

    const { number, expMonth, expYear, name, cvc } = card;

    // Basic card validation
    if (!number || !expMonth || !expYear || !cvc) {
      return res.status(400).json({
        message: "card number , expiry month, expiry year, cvc are required",
      });
    }

    const cardDigits = number.replace(/\s+/g, "");
    if (!/^\d{12,19}$/.test(cardDigits)) {
      return res.status(400).json({
        message: "invalid card number format",
      });
    }

    // Luhn check
    if (!luhnCheck(cardDigits)) {
      return res.status(400).json({ message: "card number failed Luhn check" });
    }

    // CVV check
    if (!/^\d{3,4}$/.test(String(cvc))) {
      return res.status(400).json({ message: "invalid cvc" });
    }

    // Expiry check
    if (!isExpiryValid(Number(expMonth), Number(expYear))) {
      return res.status(400).json({
        message: "Card expired",
      });
    }

    // Validate course
    const course = await Course.findById(courseId);
    if (!course) return res.status(404).json({ message: "Course not found" });

    // Simulate payment processing delay
    await new Promise((r) => setTimeout(r, 1000));

    // Mock payment outcome (adjust probability as needed)
    const successProbability = 0.9; // 90% success for demo
    const paymentSuccess = Math.random() < successProbability;

    if (!paymentSuccess) {
      return res
        .status(402)
        .json({ message: "Payment failed (mock). Try again." });
    }

    // Create purchase record but DO NOT SAVE full card details
    const cardLast4 = cardDigits.slice(-4);
    const cardBrand = detectCardBrand(cardDigits);
    const transactionId = `mock_txn_${Date.now()}_${Math.floor(
      Math.random() * 10000
    )}`;

    const purchase = new Purchase({
      userId: user.id,
      courseId: course._id,
    });

    await purchase.save();

    return res.json({
      message: "Course purchased (mock)",
    });
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
});

export default userRouter;
