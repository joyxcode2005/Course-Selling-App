import { Router, type Request, type Response } from "express";

const courseRouter = Router();

courseRouter.post("/purchase", (req: Request, res: Response) => {
  res.json({
    message: "Course Purchased",
  });
});

courseRouter.get("/bulk", (req: Request, res: Response) => {
  res.json({
    message: "All courses",
  });
});

export default courseRouter;
