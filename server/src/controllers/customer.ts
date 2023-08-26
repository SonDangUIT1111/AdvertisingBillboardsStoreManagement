import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import CustomerModel from "../models/customer"

export const getCustomers: RequestHandler = async (req, res, next)=>{
    try
    {
        const customer = await CustomerModel.find().exec();
        res.status(200).json(customer);
    }
    catch (error)
    {
        next(error);
    }
}

export const getCustomer: RequestHandler = async (req, res, next) => {
    const customerId = req.params.customerId;
    try
    {
        if (!mongoose.isValidObjectId(customerId))
        {
            throw createHttpError(400, "Invalid customer id")
        }
        const customer = await CustomerModel.findById(customerId).exec();

        if (!customer) {
            throw createHttpError(404, "Customer not found")
        }
        res.status(200).json(customer);
    }
    catch (error)
    {
        next(error)
    }
}


interface CreateCustomerBody {
    name: string,
    phoneNumber: string,
    total: number,
    payed: number,
    debt: number,
}

export const createCustomer: RequestHandler<unknown, unknown, CreateCustomerBody, unknown> = async (req, res, next ) => {
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber ;
    const total = req.body.total  ;
    const payed = req.body.payed  ;
    const debt = req.body.debt  ;
    try
    {
        const newCustomer = await CustomerModel.create({
            name : name,
            phoneNumber : phoneNumber,
            total : total, 
            payed : payed,
            debt : debt,
        })
        res.status(201).json(newCustomer);
    }
    catch (error)
    {
        next(error);
    }
}

interface UpdateCustomerParams {
    customerId: string,
}

interface UpdateCustomerBody {
    name: string,
    phoneNumber: string,
    total: number,
    payed: number,
    debt: number,
}

export const updateCustomer: RequestHandler<UpdateCustomerParams, unknown, UpdateCustomerBody, unknown> = async(req, res, next) => {
    const customerId = req.params.customerId;
    const name = req.body.name;
    const phoneNumber = req.body.phoneNumber ;
    const total = req.body.total  ;
    const payed = req.body.payed  ;
    const debt = req.body.debt  ;

    try
    {
        if (!mongoose.isValidObjectId(customerId))
        {
            throw createHttpError(400, "Invalid customer id");
        }
        const customer = await CustomerModel.findById(customerId).exec();

        if (!customer)
        {
            throw createHttpError(404, "Customer not found");
        }

        customer.name = name;
        customer.phoneNumber = phoneNumber;
        customer.total = total;
        customer.payed = payed;
        customer.debt = debt;

        const updateCustomer = await customer.save();

        res.status(200).json(updateCustomer);

    }
    catch (error)
    {
        next(error);
    }
};
