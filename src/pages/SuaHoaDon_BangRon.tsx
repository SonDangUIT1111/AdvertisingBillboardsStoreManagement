import { Edit_Decal_BangRon_Component } from "../components/drag_and_drop_component/Edit_Decal_BangRon_Component";
import { FileDrop } from "../components/drag_and_drop_component/FileDrop";

export function SuaHoaDon_BangRon() {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col">
            <FileDrop />
          </div>
          <div className="col" style={{ marginTop: "20px" }}>
            <Edit_Decal_BangRon_Component />
          </div>
        </div>
      </div>
    </>
  );
}
