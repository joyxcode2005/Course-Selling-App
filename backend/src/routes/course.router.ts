import { Router, type Request, type Response } from "express";
import Course from "../models/course.model.js";

const courseRouter = Router();

courseRouter.get("/bulk", async (req: Request, res: Response) => {
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

export default courseRouter;
