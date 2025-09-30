import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import userRouter from "./routes/user.router.js";
import courseRouter from "./routes/course.router.js";
import adminRouter from "./routes/admin.router.js";
import connectDB from "./db.js";
dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/course", courseRouter);
app.listen(PORT, async () => {
    await connectDB();
    console.log(`Server is listening on port ${PORT}`);
});
//# sourceMappingURL=index.js.map