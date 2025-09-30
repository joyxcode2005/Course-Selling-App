import mongoose, { Document, Schema, model } from "mongoose";
const adminSchema = new Schema({
    id: Schema.Types.ObjectId,
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    lastName: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
});
const Admin = mongoose.models.Admin || mongoose.model("Admin", adminSchema);
export default Admin;
//# sourceMappingURL=admin.model.js.map