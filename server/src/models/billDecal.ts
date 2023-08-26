import { InferSchemaType, model, Schema } from "mongoose";

const decalBillSchema = new Schema({
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
}, {timestamps: true});

type DecalBill = InferSchemaType<typeof decalBillSchema>;

export default model<DecalBill>("DecalBill", decalBillSchema);