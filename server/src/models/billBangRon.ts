import { InferSchemaType, model, Schema } from "mongoose";

const bangRonBillSchema = new Schema({
    idCustomer: {type: String},
    note: { type: String},
    width: {type: Number},
    height: {type: Number},
    amount: {type: Number},
    discount: {type: Number},
    totalPrice: {type: Number},
    billPrice: {type: Number},
    deposit: {type: Number},
    state: {type: String},
    image: {type: String}
}, {timestamps: true});

type BangRonBill = InferSchemaType<typeof bangRonBillSchema>;

export default model<BangRonBill>("BangRonBill", bangRonBillSchema);