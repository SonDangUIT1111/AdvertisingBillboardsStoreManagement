import express from "express"
import * as ImportMaterialRecordsController from "../controllers/importMaterialRecord"

const router = express.Router();

router.get("/", ImportMaterialRecordsController.getImportMaterialRecords);

router.get("/:recordId", ImportMaterialRecordsController.getImportMaterialRecord)

router.post("/", ImportMaterialRecordsController.createImportMaterialRecord)

router.patch("/:recordId", ImportMaterialRecordsController.updateImportMaterialRecord)

router.delete("/:recordId", ImportMaterialRecordsController.deleteImportMaterialRecord)

export default router;