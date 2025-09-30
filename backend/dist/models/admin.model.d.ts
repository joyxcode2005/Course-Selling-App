import mongoose, { Document, type ObjectId } from "mongoose";
interface IAdmin extends Document {
    id: ObjectId;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
declare const Admin: mongoose.Model<any, {}, {}, {}, any, any> | mongoose.Model<IAdmin, {}, {}, {}, mongoose.Document<unknown, {}, IAdmin, {}, {}> & IAdmin & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Admin;
//# sourceMappingURL=admin.model.d.ts.map