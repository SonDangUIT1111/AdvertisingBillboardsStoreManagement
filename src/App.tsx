import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import { TrangChu } from "./pages/TrangChu";
import { HoaDon } from "./pages/HoaDon";
import { NhapHang } from "./pages/NhapHang";
import { NavBar } from "./components/NavBar";
function App() {
  return (
    <>
      <NavBar />
      <Container className="mb-4">
        <Routes>
          <Route path="/" element={<TrangChu />} />
          <Route path="/hoadon" element={<HoaDon />} />
          <Route path="/nhaphang" element={<NhapHang />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
