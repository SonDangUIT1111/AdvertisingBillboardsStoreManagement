import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import BangHieuBillModel from "../models/billBangHieu"

export const getBangHieuBills: RequestHandler = async (req, res, next)=>{
    try
    {
        const bills = await BangHieuBillModel.find().exec();
        res.status(200).json(bills);
    }
    catch (error)
    {
        next(error);
    }
}

export const getBangHieuBill: RequestHandler = async (req, res, next) => {
    const billId = req.params.billId;
    try
    {
        if (!mongoose.isValidObjectId(billId))
        {
            throw createHttpError(400, "Invalid bill id")
        }
        const bill = await BangHieuBillModel.findById(billId).exec();

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


interface CreateBangHieuBillBody {
    idCustomer: string,
    note: string,
    width: number,
    height: number,
    amount: number,
    discount: number,
    totalPrice: number,
    billPrice: number,
    deposit: number,
    state: string,
    image: string,
    materialType: string,
    isTwoFace: boolean,
    toleNumber: number,
    hasFooter: boolean,
    isDelivery: boolean,
    costIncurred: number
}

export const createBangHieuBill: RequestHandler<unknown, unknown, CreateBangHieuBillBody, unknown> = async (req, res, next ) => {
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
    const image = req.body.image;
    const materialType = req.body.materialType;
    const isTwoFace = req.body.isTwoFace;
    const toleNumber = req.body.toleNumber;
    const hasFooter = req.body.hasFooter;
    const isDelivery = req.body.isDelivery;
    const costIncurred = req.body.costIncurred;
    try
    {
        const newBill = await BangHieuBillModel.create({
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
            image: image,
            materialType: materialType,
            isTwoFace: isTwoFace,
            toleNumber: toleNumber,
            hasFooter: hasFooter,
            isDelivery: isDelivery,
            costIncurred: costIncurred,
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
    state: string,
    image: string,
    materialType: string,
    isTwoFace: boolean,
    toleNumber: number,
    hasFooter: boolean,
    isDelivery: boolean,
    costIncurred: number
}

export const updateBangHieuBill: RequestHandler<UpdateBillParams, unknown, UpdateBillBody, unknown> = async(req, res, next) => {
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
    const image = req.body.image;
    const materialType = req.body.materialType;
    const isTwoFace = req.body.isTwoFace;
    const toleNumber = req.body.toleNumber;
    const hasFooter = req.body.hasFooter;
    const isDelivery = req.body.isDelivery;
    const costIncurred = req.body.costIncurred;

    try
    {
        if (!mongoose.isValidObjectId(billId))
        {
            throw createHttpError(400, "Invalid bill id");
        }
        const bill = await BangHieuBillModel.findById(billId).exec();

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
        bill.image = image;
        bill.materialType = materialType;
        bill.toleNumber = toleNumber;
        bill.isTwoFace = isTwoFace;
        bill.hasFooter = hasFooter;
        bill.isDelivery = isDelivery;
        bill.costIncurred = costIncurred;

        const updateBill = await bill.save();

        res.status(200).json(updateBill);

    }
    catch (error)
    {
        next(error);
    }
};

export const deleteBangHieuBill: RequestHandler = async(req, res, next) => {
    const billId = req.params.billId;
    try {
        if (!mongoose.isValidObjectId(billId))
        {
            throw createHttpError(400, "Invalid bill id");
        }

        const bill = await BangHieuBillModel.findById(billId).exec();

        if (!bill) {
            throw createHttpError(404, "Bill not found");
        }

        await bill.deleteOne();
        res.sendStatus(204);

    } catch (error) {
        
    }
}