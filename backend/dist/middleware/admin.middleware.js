import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET || "";
export function adminMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Unauthorized!!",
        });
    }
    const token = authHeader.split(" ")[1] || "";
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.admin = decoded;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid or expired token" });
    }
}
export default adminMiddleware;
//# sourceMappingURL=admin.middleware.js.map