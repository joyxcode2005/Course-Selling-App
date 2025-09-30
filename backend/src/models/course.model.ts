import { Document, model, Schema } from "mongoose";

interface ICourse extends Document {
  title: string;
  description: string;
  price: number;
  imageUrl: string;
  adminId: string;
}

const courseSchema = new Schema({
  id: Schema.Types.ObjectId,
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
    default: 0,
  },
  imageUrl: {
    type: String,
  },
  adminId: {
    type: Schema.Types.ObjectId,
    ref: "Admin",
    required: true,
  },
});

const Course = model<ICourse>("Course", courseSchema);
export default Course;
