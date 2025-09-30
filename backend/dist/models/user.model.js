import mongoose, { Document, Schema, model } from "mongoose";
const userSchema = new Schema({
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
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
//# sourceMappingURL=user.model.js.map