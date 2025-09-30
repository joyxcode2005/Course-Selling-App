import { Router } from "express";
const courseRouter = Router();
courseRouter.post("/purchase", (req, res) => {
    res.json({
        message: "Course Purchased",
    });
});
courseRouter.get("/bulk", (req, res) => {
    res.json({
        message: "All courses",
    });
});
export default courseRouter;
//# sourceMappingURL=course.router.js.map