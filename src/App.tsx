import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { TrangChu } from "./pages/TrangChu";
import { HoaDon } from "./pages/HoaDon";
import { NhapHang } from "./pages/NhapHang";
import { NavBar } from "./components/NavBar";
import { HoaDon_Decal } from "./pages/HoaDon_Decal";
import { ThemHoaDonMoi_Decal } from "./pages/ThemHoaDonMoi_Decal";
import { SuaHoaDon_Decal } from "./pages/SuaHoaDon_Decal";
import { HoaDon_BangRon } from "./pages/HoaDon_BangRon";
import { ThemHoaDonMoi_BangRon } from "./pages/ThemHoaDonMoi_BangRon";
import { SuaHoaDon_BangRon } from "./pages/SuaHoaDon_BangRon";
function App() {
  return (
    <>
      <NavBar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<TrangChu />} />
          <Route path="/hoadon" element={<HoaDon />} />
          <Route path="/nhaphang" element={<NhapHang />} />
          <Route path="/hoadon/decal" element={<HoaDon_Decal />} />
          <Route
            path="/hoadon/decal/themhoadon"
            element={<ThemHoaDonMoi_Decal />}
          />
          <Route path="/hoadon/decal/suahoadon" element={<SuaHoaDon_Decal />} />
          <Route path="/hoadon/bangron" element={<HoaDon_BangRon />} />
          <Route
            path="/hoadon/bangron/themhoadon"
            element={<ThemHoaDonMoi_BangRon />}
          />
          <Route
            path="/hoadon/bangron/suahoadon"
            element={<SuaHoaDon_BangRon />}
          />
        </Routes>
      </Container>
    </>
  );
}

export default App;
