export interface OtherBillJoinCustomer {
    _id: string,
    idCustomer: string,
    note: string,
    amount: number,
    price: number,
    billPrice: number,
    state: string,
    image: string,
    createdAt: string,
    updatedAt: string,
    customerName?: string,
    phoneNumber?: string
}