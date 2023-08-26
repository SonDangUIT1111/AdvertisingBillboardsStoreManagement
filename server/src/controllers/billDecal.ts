import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import DecalBillModel from "../models/billDecal"

export const getDecalBills: RequestHandler = async (req, res, next)=>{
    try
    {
        const bills = await DecalBillModel.find().exec();
        res.status(200).json(bills);
    }
    catch (error)
    {
        next(error);
    }
}

export const getDecalBill: RequestHandler = async (req, res, next) => {
    const billId = req.params.billId;
    try
    {
        if (!mongoose.isValidObjectId(billId))
        {
            throw createHttpError(400, "Invalid bill id")
        }
        const bill = await DecalBillModel.findById(billId).exec();

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


interface CreateDecalBillBody {
    idCustomer: string,
    note: string,
    width: number,
    height: number,
    amount: number,
    discount: number,
    totalPrice: number,
    billPrice: number,
    deposit: number,
    state: string
}

export const createDecalBill: RequestHandler<unknown, unknown, CreateDecalBillBody, unknown> = async (req, res, next ) => {
    const idCustomer = req.body.idCustomer;
    const note = req.body.note ;
    const width = req.body.width  ;
    const height = req.body.height  ;
    const amount = req.body.amount  ;
    const discount = req.body.discount  ;
    const totalPrice = req.body.totalPrice  ;
    const billPrice = req.body.billPrice  ;
    const deposit = req.body.deposit  ;
    const state = req.body.state ;
    try
    {
        const newBill = await DecalBillModel.create({
            idCustomer : idCustomer,
            note : note,
            width : width, 
            height : height,
            amount : amount,
            discount : discount,
            totalPrice : totalPrice,
            billPrice : billPrice,
            deposit : deposit,
            state : state,
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
    width: number,
    height: number,
    amount: number,
    discount: number,
    totalPrice: number,
    billPrice: number,
    deposit: number,
    state: string
}

export const updateDecalBill: RequestHandler<UpdateBillParams, unknown, UpdateBillBody, unknown> = async(req, res, next) => {
    const billId = req.params.billId;
    const idCustomer = req.body.idCustomer;
    const note = req.body.note ;
    const width = req.body.width  ;
    const height = req.body.height  ;
    const amount = req.body.amount  ;
    const discount = req.body.discount  ;
    const totalPrice = req.body.totalPrice  ;
    const billPrice = req.body.billPrice  ;
    const deposit = req.body.deposit  ;
    const state = req.body.state ;

    try
    {
        if (!mongoose.isValidObjectId(billId))
        {
            throw createHttpError(400, "Invalid bill id");
        }
        const bill = await DecalBillModel.findById(billId).exec();

        if (!bill)
        {
            throw createHttpError(404, "Note not found");
        }

        bill.idCustomer = idCustomer;
        bill.note = note;
        bill.width = width;
        bill.height = height;
        bill.amount = amount;
        bill.discount = discount;
        bill.totalPrice = totalPrice;
        bill.billPrice = billPrice;
        bill.deposit = deposit;
        bill.state = state;

        const updateBill = await bill.save();

        res.status(200).json(updateBill);

    }
    catch (error)
    {
        next(error);
    }
};

export const deleteDecalBill: RequestHandler = async(req, res, next) => {
    const billId = req.params.billId;
    try {
        if (!mongoose.isValidObjectId(billId))
        {
            throw createHttpError(400, "Invalid bill id");
        }

        const bill = await DecalBillModel.findById(billId).exec();

        if (!bill) {
            throw createHttpError(404, "Bill not found");
        }

        await bill.deleteOne();
        res.sendStatus(204);

    } catch (error) {
        
    }
}