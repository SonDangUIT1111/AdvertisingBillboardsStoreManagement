import { FileDrop } from "../components/drag_and_drop_component/FileDrop";
import { Information_Decal_BangRon } from "../components/drag_and_drop_component/Information_Decal_BangRon";

export function ThemHoaDonMoi_Decal() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <FileDrop />
          </div>
          <div className="col" style={{ marginTop: "20px" }}>
            <Information_Decal_BangRon />
          </div>
        </div>
      </div>
    </>
  );
}
