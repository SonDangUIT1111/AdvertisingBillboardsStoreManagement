import { useState } from "react";
import { HoaDonItemList } from "../components/HoaDonItemList";
import { HoaDonTitle } from "../components/HoaDonTitle";
import { SearchBar } from "../components/SearchBar";
import { HoaDonBangRonData, HoaDonDecalData } from "../data/data";

export function HoaDon_BangRon() {
  let isDefault = true;
  const [list, setList] = useState(HoaDonBangRonData);
  const [copyList, setCopyList] = useState(HoaDonBangRonData);
  const handleSort = () => {
    console.log(list);
    if (isDefault) {
      setList([]);
    } else setList(copyList);
    isDefault = !isDefault;
  };
  const setState = (index: number, state: string) => {
    list.map((item) => (item.id === index ? (item.state = state) : {}));
  };
  return (
    <>
      <SearchBar
        areaIndex={"2"}
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
          setState={setState}
        />
      ))}
    </>
  );
}
