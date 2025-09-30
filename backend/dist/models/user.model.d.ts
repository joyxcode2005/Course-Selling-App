import mongoose, { Document, type ObjectId } from "mongoose";
interface IUser extends Document {
    id: ObjectId;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}
declare const User: mongoose.Model<any, {}, {}, {}, any, any> | mongoose.Model<IUser, {}, {}, {}, mongoose.Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default User;
//# sourceMappingURL=user.model.d.ts.map