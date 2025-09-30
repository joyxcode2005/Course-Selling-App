import { Schema } from "mongoose";
declare const Purchase: import("mongoose").Model<{
    id?: import("mongoose").Types.ObjectId | null;
    courseId?: import("mongoose").Types.ObjectId | null;
    userId?: import("mongoose").Types.ObjectId | null;
}, {}, {}, {}, import("mongoose").Document<unknown, {}, {
    id?: import("mongoose").Types.ObjectId | null;
    courseId?: import("mongoose").Types.ObjectId | null;
    userId?: import("mongoose").Types.ObjectId | null;
}, {}, import("mongoose").DefaultSchemaOptions> & {
    id?: import("mongoose").Types.ObjectId | null;
    courseId?: import("mongoose").Types.ObjectId | null;
    userId?: import("mongoose").Types.ObjectId | null;
} & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    id?: import("mongoose").Types.ObjectId | null;
    courseId?: import("mongoose").Types.ObjectId | null;
    userId?: import("mongoose").Types.ObjectId | null;
}, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<{
    id?: import("mongoose").Types.ObjectId | null;
    courseId?: import("mongoose").Types.ObjectId | null;
    userId?: import("mongoose").Types.ObjectId | null;
}>, {}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & import("mongoose").FlatRecord<{
    id?: import("mongoose").Types.ObjectId | null;
    courseId?: import("mongoose").Types.ObjectId | null;
    userId?: import("mongoose").Types.ObjectId | null;
}> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>>;
export default Purchase;
//# sourceMappingURL=purchase.model.d.ts.map