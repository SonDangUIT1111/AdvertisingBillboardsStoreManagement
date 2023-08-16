import { HoaDonItemList } from "../components/HoaDonItemList";
import { HoaDonTitle } from "../components/HoaDonTitle";
import { SearchBar } from "../components/SearchBar";
import { HoaDonDecalData } from "../data/data";

export function HoaDon_Decal() {
  return (
    <>
      <SearchBar areaIndex={"1"} />
      <HoaDonTitle />
      {HoaDonDecalData.map((data) => (
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
        />
      ))}
    </>
  );
}
