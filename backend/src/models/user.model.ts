import mongoose, { Document, Schema, model, type ObjectId } from "mongoose";

interface IUser extends Document {
  id: ObjectId,
  email: string,
  password: string,
  firstName: string,
  lastName: string,
}

const userSchema = new Schema<IUser>({
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

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);
export default User;
