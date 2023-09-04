import { InferSchemaType, model, Schema } from "mongoose";

const otherlBillSchema = new Schema({
    idCustomer: {type: String},
    note: { type: String},
    amount: {type: Number},
    price: {type: Number},
    billPrice: {type: Number},
    state: {type: String},
    image: {type: String}
}, {timestamps: true});

type OtherBill = InferSchemaType<typeof otherlBillSchema>;

export default model<OtherBill>("OtherBill", otherlBillSchema);