import mongoose from "mongoose";
import "dotenv/config";
async function connectDB() {
    try {
        const dbUri = process.env.MONGO_URI;
        if (!dbUri) {
            throw new Error("MONGO_URI is not defined in environment variables");
        }
        await mongoose.connect(dbUri);
        console.log("MongoDB connected successfully!!");
    }
    catch (error) {
        console.log("MONGODB connection error:", error);
        process.exit(1);
    }
}
export default connectDB;
//# sourceMappingURL=db.js.map