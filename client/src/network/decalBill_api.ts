import { DecalBill } from "../models/decalBill";

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

export async function fetchDecalBills(): Promise<DecalBill[]> {
    const response = await fetch("/api/decalBills", {
        method: "GET",
      });
      return response.json();

} 

export interface DecalBillInput {
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
}

export async function createDecalBill(note: DecalBillInput): Promise<DecalBill> {
    const response = await fetchData("/api/decalBills", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
    });
    return response.json();
}

export async function updateDecalBill(billId: string, bill: DecalBillInput): Promise<DecalBill> {
    const response = await fetchData("/api/decalBills/" + billId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(bill),
        });
    return response.json();
}

export async function deleteDecalBill(billId: string) {
    await fetchData("/api/decalBills/" + billId, { method: "DELETE" });
}