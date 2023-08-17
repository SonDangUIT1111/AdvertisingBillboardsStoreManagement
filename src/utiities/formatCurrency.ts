const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {currency: "VND", style: "currency"})

export function formatCurrency(value: number ) {
    return CURRENCY_FORMAT.format(value)
}