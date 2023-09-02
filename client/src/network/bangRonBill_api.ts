import { BangRonBill } from "../models/bangRonBill";

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

export async function fetchBangRonBills(): Promise<BangRonBill[]> {
    const response = await fetch("/api/bangRonBills", {
        method: "GET",
      });
      return response.json();

} 

export async function fetchBangRonBill(billId: string): Promise<BangRonBill> {
    const response = await fetch("/api/bangRonBills/"+billId, {
        method: "GET",
      });
      return response.json();

} 

export type BangRonBillInput = {
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
    image: string
}

export async function createBangRonBill(bill: BangRonBillInput): Promise<BangRonBill> {
    const response = await fetchData("/api/bangRonBills", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bill),
    });
    return response.json();
}

export async function updateBangRonBill(billId: string, bill: BangRonBillInput): Promise<BangRonBill> {
    const response = await fetchData("/api/bangRonBills/" + billId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bill),
        });
    return response.json();
}

export async function deleteBangRonBill(billId: string) {
    await fetchData("/api/bangRonBills/" + billId, { method: "DELETE" });
}