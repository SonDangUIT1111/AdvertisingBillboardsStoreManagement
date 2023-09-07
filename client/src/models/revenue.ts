export interface Revenue {
    _id: string,
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
    createdAt: string,
    updatedAt: string,
}

