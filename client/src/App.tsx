import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { TrangChu } from "./pages/TrangChu";
import { HoaDon } from "./pages/HoaDon";
import { NhapHang } from "./pages/NhapHang";
import { NavBar } from "./components/NavBar";
import { HoaDon_Decal } from "./pages/Decal/HoaDon_Decal";
import { ThemHoaDonMoi_Decal } from "./pages/Decal/ThemHoaDonMoi_Decal";
import { SuaHoaDon_Decal } from "./pages/Decal/SuaHoaDon_Decal";
import { HoaDon_BangRon } from "./pages/BangRon/HoaDon_BangRon";
import { ThemHoaDonMoi_BangRon } from "./pages/BangRon/ThemHoaDonMoi_BangRon";
import { SuaHoaDon_BangRon } from "./pages/BangRon/SuaHoaDon_BangRon";
import { HoaDon_BangHieu } from "./pages/BangHieu/HoaDon_BangHieu";
import { ThemHoaDonMoi_BangHieu } from "./pages/BangHieu/ThemHoaDonMoi_BangHieu";
import { SuaHoaDon_BangHieu } from "./pages/BangHieu/SuaHoaDon_BangHieu";
import { HoaDon_Khac } from "./pages/Khac/HoaDon_Khac";
import { ThemHoaDonMoi_Khac } from "./pages/Khac/ThemHoaDonMoi_Khac";
import { SuaHoaDon_Khac } from "./pages/Khac/SuaHoaDon_Khac";

function App() {
  return (
    <>
      <NavBar />
      <Container className="mb-4" style={{ zIndex: "0" }}>
        <Routes>
          {/* //complete */}
          <Route path="/" element={<TrangChu />} />
          <Route path="/hoadon" element={<HoaDon />} />
          <Route path="/nhaphang" element={<NhapHang />} />
          <Route path="/hoadon/decal" element={<HoaDon_Decal />} />
          <Route
            path="/hoadon/decal/themhoadon"
            element={<ThemHoaDonMoi_Decal />}
          />
          <Route
            path="/hoadon/decal/suahoadon/:idBill"
            element={<SuaHoaDon_Decal />}
          />
          <Route path="/hoadon/bangron" element={<HoaDon_BangRon />} />
          <Route
            path="/hoadon/bangron/themhoadon"
            element={<ThemHoaDonMoi_BangRon />}
          />
          <Route
            path="/hoadon/bangron/suahoadon/:idBill"
            element={<SuaHoaDon_BangRon />}
          />
          <Route path="/hoadon/banghieu" element={<HoaDon_BangHieu />} />
          <Route
            path="/hoadon/banghieu/themhoadon"
            element={<ThemHoaDonMoi_BangHieu />}
          />
          <Route
            path="/hoadon/banghieu/suahoadon/:idBill"
            element={<SuaHoaDon_BangHieu />}
          />
          <Route path="/hoadon/khac" element={<HoaDon_Khac />} />
          <Route
            path="/hoadon/khac/themhoadon"
            element={<ThemHoaDonMoi_Khac />}
          />
          <Route
            path="/hoadon/khac/suahoadon/:idBill"
            element={<SuaHoaDon_Khac />}
          />
        </Routes>
        {/* /////// */}
      </Container>
    </>
  );
}

export default App;
