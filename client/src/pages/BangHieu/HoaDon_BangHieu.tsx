import { MouseEvent, SetStateAction } from "react";
import { HoaDonItemList } from "../../components/HoaDonItemList";
import { HoaDonTitle } from "../../components/HoaDonTitle";
import { SearchBar } from "../../components/SearchBar";
import { DecalBillJoinCustomer } from "../../models/decallBillJoinCustomer";

export function HoaDon_BangHieu() {
  return (
    <>
      <SearchBar
        areaIndex={"3"}
        listInfo={[]}
        copyList={[]}
        setList={function (
          value: SetStateAction<DecalBillJoinCustomer[]>
        ): void {
          throw new Error("Function not implemented.");
        }}
      />
      <HoaDonTitle
        handleSort={function (
          event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
        ): void {
          throw new Error("Function not implemented.");
        }}
      />
    </>
  );
}
