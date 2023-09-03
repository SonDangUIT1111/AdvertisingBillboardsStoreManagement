import { BangHieuBill } from "../models/bangHieuBill";

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

export async function fetchBangHieuBills(): Promise<BangHieuBill[]> {
    const response = await fetch("/api/bangHieuBills", {
        method: "GET",
      });
      return response.json();

} 

export async function fetchBangHieuBill(billId: string): Promise<BangHieuBill> {
    const response = await fetch("/api/bangHieuBills/"+billId, {
        method: "GET",
      });
      return response.json();

} 

export type BangHieuBillInput = {
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

export async function createBangHieuBill(bill: BangHieuBillInput): Promise<BangHieuBill> {
    const response = await fetchData("/api/bangHieuBills", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bill),
    });
    return response.json();
}

export async function updateBangHieuBill(billId: string, bill: BangHieuBillInput): Promise<BangHieuBill> {
    const response = await fetchData("/api/bangHieuBills/" + billId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bill),
        });
    return response.json();
}

export async function deleteBangHieuBill(billId: string) {
    await fetchData("/api/bangHieuBills/" + billId, { method: "DELETE" });
}