import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
const JWT_SECRET = process.env.JWT_SECRET || "";
export function userMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    console.log(JWT_SECRET);
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized!!",
        });
    }
    const token = authHeader.split(" ")[1] || "";
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log(error);
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}
export default userMiddleware;
//# sourceMappingURL=user.middleware.js.map