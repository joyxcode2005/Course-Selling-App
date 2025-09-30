import { Document } from "mongoose";
interface ICourse extends Document {
    title: string;
    description: string;
    price: number;
    imageUrl: string;
    adminId: string;
}
declare const Course: import("mongoose").Model<ICourse, {}, {}, {}, Document<unknown, {}, ICourse, {}, {}> & ICourse & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Course;
//# sourceMappingURL=course.model.d.ts.map