import { ImportMaterialRecord } from "../models/importMaterialRecord";

async function fetchData(input: RequestInfo, init?: RequestInit) {
  const response = await fetch(input, init);
  if (response.ok) {
    return response;
  } else {
    const errorBody = await response.json();
    const errorMessage = errorBody.error;
    throw Error(errorMessage);
  }
}

export async function fetchImportMaterialRecords(): Promise<
  ImportMaterialRecord[]
> {
  const response = await fetch(
    "https://advertising-billboards-store-management-7jg89yi8h.vercel.app/api/importMaterialRecords",
    {
      method: "GET",
    }
  );
  return response.json();
}

export async function fetchImportMaterialRecord(
  recordId: string
): Promise<ImportMaterialRecord> {
  const response = await fetch(
    "https://advertising-billboards-store-management-7jg89yi8h.vercel.app/api/importMaterialRecords/" +
      recordId,
    {
      method: "GET",
    }
  );
  return response.json();
}

export type ImportMaterialRecordInput = {
  note: string;
  price: number;
};

export async function createImportMaterialRecord(
  record: ImportMaterialRecordInput
): Promise<ImportMaterialRecord> {
  const response = await fetchData(
    "https://advertising-billboards-store-management-7jg89yi8h.vercel.app/api/importMaterialRecords",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    }
  );
  return response.json();
}

export async function updateImportMaterialRecord(
  recordId: string,
  record: ImportMaterialRecordInput
): Promise<ImportMaterialRecord> {
  const response = await fetchData(
    "https://advertising-billboards-store-management-7jg89yi8h.vercel.app/api/importMaterialRecords/" +
      recordId,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(record),
    }
  );
  return response.json();
}

export async function deleteImportMaterialRecord(recordId: string) {
  await fetchData(
    "https://advertising-billboards-store-management-7jg89yi8h.vercel.app/api/importMaterialRecords/" +
      recordId,
    { method: "DELETE" }
  );
}
