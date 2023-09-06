import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import ImportMaterialReportModel from "../models/importMaterialRecord"

export const getImportMaterialRecords: RequestHandler = async (req, res, next)=>{
    try
    {
        const records = await ImportMaterialReportModel.find().exec();
        res.status(200).json(records);
    }
    catch (error)
    {
        next(error);
    }
}

export const getImportMaterialRecord: RequestHandler = async (req, res, next) => {
    const recordId = req.params.recordId;
    try
    {
        if (!mongoose.isValidObjectId(recordId))
        {
            throw createHttpError(400, "Invalid record id")
        }
        const record = await ImportMaterialReportModel.findById(recordId).exec();

        if (!record) {
            throw createHttpError(404, "record not found")
        }
        res.status(200).json(record);
    }
    catch (error)
    {
        next(error)
    }
}


interface CreateImportMaterialRecordBody {
    note: string,
    price: number,
}

export const createImportMaterialRecord: RequestHandler<unknown, unknown, CreateImportMaterialRecordBody, unknown> = async (req, res, next ) => {
    const note = req.body.note ;
    const price = req.body.price ;
    try
    {
        const newRecord = await ImportMaterialReportModel.create({
            note : note,
            price : price, 
        })
        res.status(201).json(newRecord);
    }
    catch (error)
    {
        next(error);
    }
}

interface UpdateRecordParams {
    recordId: string,
}

interface UpdateRecordBody {
    note: string,
    price: number,
}

export const updateImportMaterialRecord: RequestHandler<UpdateRecordParams, unknown, UpdateRecordBody, unknown> = async(req, res, next) => {
    const recordId = req.params.recordId;
    const note = req.body.note ;
    const price = req.body.price  ;

    try
    {
        if (!mongoose.isValidObjectId(recordId))
        {
            throw createHttpError(400, "Invalid record id");
        }
        const record = await ImportMaterialReportModel.findById(recordId).exec();

        if (!record)
        {
            throw createHttpError(404, "Note not found");
        }

        record.note = note;
        record.price = price;

        const updateRecord = await record.save();

        res.status(200).json(updateRecord);

    }
    catch (error)
    {
        next(error);
    }
};

export const deleteImportMaterialRecord: RequestHandler = async(req, res, next) => {
    const recordId = req.params.recordId;
    try {
        if (!mongoose.isValidObjectId(recordId))
        {
            throw createHttpError(400, "Invalid record id");
        }

        const record = await ImportMaterialReportModel.findById(recordId).exec();

        if (!record) {
            throw createHttpError(404, "record not found");
        }

        await record.deleteOne();
        res.sendStatus(204);

    } catch (error) {
        
    }
}