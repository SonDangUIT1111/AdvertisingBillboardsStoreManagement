import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import ServicePriceModel from "../models/priceService"

export const getServicePrices: RequestHandler = async (req, res, next)=>{
    try
    {
        const prices = await ServicePriceModel.find().exec();
        res.status(200).json(prices);
    }
    catch (error)
    {
        next(error);
    }
}

export const getServicePrice: RequestHandler = async (req, res, next) => {
    const serviceId = req.params.serviceId;
    try
    {
        if (!mongoose.isValidObjectId(serviceId))
        {
            throw createHttpError(400, "Invalid service id")
        }
        const prices = await ServicePriceModel.findById(serviceId).exec();

        if (!prices) {
            throw createHttpError(404, "prices not found")
        }
        res.status(200).json(prices);
    }
    catch (error)
    {
        next(error)
    }
}



interface UpdatePriceParams {
    serviceId: string,
}

interface UpdatePriceBody {
    serviceName: string,
    price: number,
}

export const updateServicePrice: RequestHandler<UpdatePriceParams, unknown, UpdatePriceBody, unknown> = async(req, res, next) => {
    const serviceId = req.params.serviceId;
    const serviceName = req.body.serviceName;
    const price = req.body.price ;

    try
    {
        if (!mongoose.isValidObjectId(serviceId))
        {
            throw createHttpError(400, "Invalid service id");
        }
        const service = await ServicePriceModel.findById(serviceId).exec();

        if (!service)
        {
            throw createHttpError(404, "Note not found");
        }

        service.serviceName = serviceName;
        service.price = price;

        const updateService = await service.save();

        res.status(200).json(updateService);

    }
    catch (error)
    {
        next(error);
    }
};

