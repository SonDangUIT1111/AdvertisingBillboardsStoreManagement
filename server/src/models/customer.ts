import { InferSchemaType, model, Schema } from "mongoose";

const customerSchema = new Schema({
    name: {type: String},
    phoneNumber: {type: String},
    total: {type: Number},
    payed: {type: Number},
    debt: {type: Number}
});

type Customer = InferSchemaType<typeof customerSchema>;

export default model<Customer>("Customer", customerSchema);