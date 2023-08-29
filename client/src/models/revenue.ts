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
        incomeHopDen: number,
        incomeTanHon: number,
        incomeKhac: number
    }
    createdAt: string,
    updatedAt: string,
}

