import { Document, model, Schema } from "mongoose";
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
const Course = model("Course", courseSchema);
export default Course;
//# sourceMappingURL=course.model.js.map