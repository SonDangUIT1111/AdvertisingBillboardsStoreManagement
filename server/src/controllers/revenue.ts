import { RequestHandler } from "express";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import RevenueModel from "../models/revenue"

export const getRevenues: RequestHandler = async (req, res, next)=>{
    try
    {
        const revenues = await RevenueModel.find().exec();
        res.status(200).json(revenues);
    }
    catch (error)
    {
        next(error);
    }
}

export const getRevenue: RequestHandler = async (req, res, next) => {
    const monthParam = req.params.monthParam;
    const yearParam = req.params.yearParam;
    try
    {
        const revenue = await RevenueModel.findOne({month: monthParam, year: yearParam}).exec();

        if (!revenue) {
            throw createHttpError(404, "Revenue not found")
        }
        res.status(200).json(revenue);
    }
    catch (error)
    {
        next(error)
    }
}


interface CreateRevenueBody {
    totalIncome: number,
    totalOutcome: number,
    month: number,
    year: number,
    kindRevenue: {
        incomeDecal: number,
        incomeBangRon: number,
        incomeBangHieu: number,
        incomeKhac: number,
        decalOrder: number,
        bangRonOrder: number,
        bangHieuOrder: number,
        khacOrder: number
    }
}

export const createRevenue: RequestHandler<unknown, unknown, CreateRevenueBody, unknown> = async (req, res, next ) => {
    const totalIncome = req.body.totalIncome;
    const totalOutcome = req.body.totalOutcome;
    const month = req.body.month;
    const year = req.body.year;
    const kindRevenue = req.body.kindRevenue;
    try
    {
        const newRevenue = await RevenueModel.create({
            totalIncome: totalIncome,
            totalOutcome: totalOutcome,
            month: month,
            year: year,
            kindRevenue: kindRevenue
        })
        res.status(201).json(newRevenue);
    }
    catch (error)
    {
        next(error);
    }
}

interface UpdateRevenueParams {
    monthParam: number,
    yearParam: number
}

interface UpdateRevenueBody {
    totalIncome: number,
    totalOutcome: number,
    month: number,
    year: number,
    kindRevenue: {
        incomeDecal: number,
        incomeBangRon: number,
        incomeBangHieu: number,
        incomeKhac: number,
        decalOrder: number,
        bangRonOrder: number,
        bangHieuOrder: number,
        khacOrder: number
    }
}

export const updateRevenue: RequestHandler<UpdateRevenueParams, unknown, UpdateRevenueBody, unknown> = async(req, res, next) => {
    const monthParam = req.params.monthParam;
    const yearParam = req.params.yearParam;
    const totalIncome = req.body.totalIncome;
    const totalOutcome = req.body.totalOutcome ;
    const month = req.body.month  ;
    const year = req.body.year  ;
    const kindRevenue = req.body.kindRevenue  ;

    try
    {
        const revenue = await RevenueModel.findOne({year: yearParam, month: monthParam}).exec();

        if (!revenue)
        {
            const newRevenue = await RevenueModel.create({
                totalIncome: totalIncome,
                totalOutcome: totalOutcome,
                month: month,
                year: year,
                kindRevenue: kindRevenue
            })
            res.status(201).json(newRevenue);
        }
        else {
            revenue.totalIncome = totalIncome;
            revenue.totalOutcome = totalOutcome;
            revenue.month = month;
            revenue.year = year;
            revenue.kindRevenue = kindRevenue;
    
            const updateRevenue = await revenue.save();
    
            res.status(200).json(updateRevenue);
        }


    }
    catch (error)
    {
        next(error);
    }
};
