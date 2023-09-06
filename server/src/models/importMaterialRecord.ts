import { InferSchemaType, model, Schema } from "mongoose";

const importMaterialRecordSchema = new Schema({
    note: {type: String},
    price: {type: Number},
},{timestamps: true});

type ImportMaterialRecord = InferSchemaType<typeof importMaterialRecordSchema>;

export default model<ImportMaterialRecord>("ImportMaterialRecord", importMaterialRecordSchema);