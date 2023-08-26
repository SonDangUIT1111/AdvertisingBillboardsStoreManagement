import { InferSchemaType, model, Schema } from "mongoose";

const servicePriceSchema = new Schema({
    serviceName: {type: String},
    price: {type: Number},
}, {timestamps: true});

type ServicePrice = InferSchemaType<typeof servicePriceSchema>;

export default model<ServicePrice>("ServicePrice", servicePriceSchema);