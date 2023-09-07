import { Revenue } from "../models/revenue";

async function fetchData( input: RequestInfo, init?: RequestInit) {
    const response = await fetch(input, init);
    if ( response.ok ) {
        return response;
    }
    else {
        const errorBody = await response.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export async function fetchRevenues(): Promise<Revenue[]> {
    const response = await fetch("/api/revenues", {
        method: "GET",
      });
      return response.json();

} 

export async function fetchRevenue(monthParam: number, yearParam: number): Promise<Revenue> {
    const response = await fetch("/api/revenues/" + monthParam + "/"+yearParam, {
        method: "GET",
      });
      return response.json();

} 

export type RevenueInput = {
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

export async function createRevenue(revenue: RevenueInput): Promise<Revenue> {
    const response = await fetchData("/api/revenues", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(revenue),
    });
    return response.json();
}

export async function updateRevenue(monthParam: number, yearParam: number, revenue: RevenueInput): Promise<Revenue> {
    const response = await fetchData("/api/revenues/" + monthParam + "/"+yearParam,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(revenue),
        });
    return response.json();
}
