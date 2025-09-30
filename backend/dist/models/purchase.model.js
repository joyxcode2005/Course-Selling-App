import { Schema, model } from "mongoose";
const purchaseSchema = new Schema({
    id: Schema.Types.ObjectId,
    courseId: {
        type: Schema.Types.ObjectId,
        ref: "Course",
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
    },
});
const Purchase = model("purchase", purchaseSchema);
export default Purchase;
//# sourceMappingURL=purchase.model.js.map