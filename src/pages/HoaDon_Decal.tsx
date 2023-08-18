import { useState } from "react";
import { HoaDonItemList } from "../components/HoaDonItemList";
import { HoaDonTitle } from "../components/HoaDonTitle";
import { SearchBar } from "../components/SearchBar";
import { HoaDonDecalData } from "../data/data";

export function HoaDon_Decal() {
  let isDefault = true;
  const [list, setList] = useState(HoaDonDecalData);
  const [copyList, setCopyList] = useState(HoaDonDecalData);

  const handleSort = () => {
    isDefault = !isDefault;
    if (isDefault) {
      list.sort((a, b) => {
        return b.price - a.price;
      });
    } else
      return list.sort((a, b) => {
        return a.price - b.price;
      });
  };
  return (
    <>
      <SearchBar
        areaIndex={"1"}
        listInfo={list}
        setListInfo={setList}
        copyList={copyList}
      />
      <HoaDonTitle handleSort={handleSort} />
      {list.map((data) => (
        <HoaDonItemList
          key={data.id}
          phoneNumber={data.phoneNumber}
          name={data.name}
          note={data.note}
          height={data.height}
          width={data.width}
          price={data.price}
          discount={data.discount}
          deposit={data.deposit}
          state={data.state}
          dateOrder={data.dateOrder}
          id={data.id}
          total={0}
        />
      ))}
    </>
  );
}
