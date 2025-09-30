import mongoose, { Document, Schema, model, type ObjectId } from "mongoose";

interface IAdmin extends Document {
  id: ObjectId;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

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

const Admin = mongoose.models.Admin || mongoose.model<IAdmin>("Admin", adminSchema);
export default Admin;
