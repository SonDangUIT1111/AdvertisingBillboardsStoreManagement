import { OtherBill } from "../models/otherBill";

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

export async function fetchOtherBills(): Promise<OtherBill[]> {
    const response = await fetch("/api/otherBills", {
        method: "GET",
      });
      return response.json();

} 

export async function fetchOtherBill(billId: string): Promise<OtherBill> {
    const response = await fetch("/api/otherBills/"+billId, {
        method: "GET",
      });
      return response.json();

} 

export type OtherBillInput = {
    idCustomer: string,
    note: string,
    amount: number,
    price: number,
    billPrice: number,
    state: string,
    image: string
}

export async function createOtherBill(bill: OtherBillInput): Promise<OtherBill> {
    const response = await fetchData("/api/otherBills", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(bill),
    });
    return response.json();
}

export async function updateOtherBill(billId: string, bill: OtherBillInput): Promise<OtherBill> {
    const response = await fetchData("/api/otherBills/" + billId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bill),
        });
    return response.json();
}

export async function deleteOtherBill(billId: string) {
    await fetchData("/api/otherBills/" + billId, { method: "DELETE" });
}