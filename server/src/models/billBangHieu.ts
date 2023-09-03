import { InferSchemaType, model, Schema } from "mongoose";

const bangHieuBillSchema = new Schema({
    idCustomer: {type: String},
    note: {type: String},
    width: {type: Number},
    height: {type: Number},
    amount: {type: Number},
    discount: {type: Number},
    totalPrice: {type: Number},
    billPrice: {type: Number},
    deposit: {type: Number},
    state: {type: String},
    image: {type: String},
    materialType: {type: String},
    isTwoFace: {type: Boolean},
    toleNumber: {type: Number},
    hasFooter: {type: Boolean},
    isDelivery: {type: Boolean},
    costIncurred: {type: Number},

}, {timestamps: true});

type BangHieuBill = InferSchemaType<typeof bangHieuBillSchema>;

export default model<BangHieuBill>("BangHieuBill", bangHieuBillSchema);