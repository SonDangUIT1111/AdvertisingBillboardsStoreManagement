import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import OtherBillModel from "../models/billOther"

export const getOtherBills: RequestHandler = async (req, res, next)=>{
    try
    {
        const bills = await OtherBillModel.find().exec();
        res.status(200).json(bills);
    }
    catch (error)
    {
        next(error);
    }
}

export const getOtherBill: RequestHandler = async (req, res, next) => {
    const billId = req.params.billId;
    try
    {
        if (!mongoose.isValidObjectId(billId))
        {
            throw createHttpError(400, "Invalid bill id")
        }
        const bill = await OtherBillModel.findById(billId).exec();

        if (!bill) {
            throw createHttpError(404, "Bill not found")
        }
        res.status(200).json(bill);
    }
    catch (error)
    {
        next(error)
    }
}


interface CreateOtherBillBody {
    idCustomer: string,
    note: string,
    amount: number,
    price: number,
    billPrice: number,
    state: string,
    image: string
}

export const createOtherBill: RequestHandler<unknown, unknown, CreateOtherBillBody, unknown> = async (req, res, next ) => {
    const idCustomer = req.body.idCustomer;
    const note = req.body.note ;
    const amount = req.body.amount  ;
    const price = req.body.price  ;
    const billPrice = req.body.billPrice  ;
    const state = req.body.state  ;
    const image = req.body.image  ;
    try
    {
        const newBill = await OtherBillModel.create({
            idCustomer : idCustomer,
            note : note,
            amount : amount,
            price : price,
            billPrice : billPrice,
            state : state,
            image: image
        })
        res.status(201).json(newBill);
    }
    catch (error)
    {
        next(error);
    }
}

interface UpdateBillParams {
    billId: string,
}

interface UpdateBillBody {
    idCustomer: string,
    note: string,
    amount: number,
    price: number,
    billPrice: number,
    state: string,
    image: string
}

export const updateOtherBill: RequestHandler<UpdateBillParams, unknown, UpdateBillBody, unknown> = async(req, res, next) => {
    const billId = req.params.billId;
    const idCustomer = req.body.idCustomer;
    const note = req.body.note ;
    const amount = req.body.amount  ;
    const price = req.body.price  ;
    const billPrice = req.body.billPrice  ;
    const state = req.body.state ;
    const image = req.body.image;

    try
    {
        if (!mongoose.isValidObjectId(billId))
        {
            throw createHttpError(400, "Invalid bill id");
        }
        const bill = await OtherBillModel.findById(billId).exec();

        if (!bill)
        {
            throw createHttpError(404, "Note not found");
        }

        bill.idCustomer = idCustomer;
        bill.note = note;
        bill.amount = amount;
        bill.price = price;
        bill.billPrice = billPrice;
        bill.state = state;
        bill.image = image;

        const updateBill = await bill.save();

        res.status(200).json(updateBill);

    }
    catch (error)
    {
        next(error);
    }
};

export const deleteOtherBill: RequestHandler = async(req, res, next) => {
    const billId = req.params.billId;
    try {
        if (!mongoose.isValidObjectId(billId))
        {
            throw createHttpError(400, "Invalid bill id");
        }

        const bill = await OtherBillModel.findById(billId).exec();

        if (!bill) {
            throw createHttpError(404, "Bill not found");
        }

        await bill.deleteOne();
        res.sendStatus(204);

    } catch (error) {
        
    }
}