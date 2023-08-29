import { InferSchemaType, model, Schema } from "mongoose";

const revenueSchema = new Schema({
    totalIncome: {type: Number},
    totalOutcome: {type: Number},
    month: {type: Number},
    year: {type: Number},
    kindRevenue: {
        incomeDecal: Number,
        incomeBangRon: Number,
        incomeBangHieu: Number,
        incomeHopDen: Number,
        incomeTanHon: Number,
        incomeKhac: Number
    }
});

type Revenue = InferSchemaType<typeof revenueSchema>;

export default model<Revenue>("Revenue", revenueSchema);