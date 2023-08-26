import { ServicePrice } from "../models/servicePrice";

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

export async function fetchServicePrices(): Promise<ServicePrice[]> {
    const response = await fetch("/api/servicePrices", {
        method: "GET",
      });
      return response.json();

} 

export interface ServicePriceInput {
    serviceName: string,
    price: number,
}



export async function updateServicePrice(serviceId: string, service: ServicePriceInput): Promise<ServicePrice> {
    const response = await fetchData("/api/servicePrices/" + serviceId,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(service),
        });
    return response.json();
}

