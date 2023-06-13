import React from "react";
import {
  MemberPage,
  InstrukturPage,
  LoginPage,
  JadwalUmumPage,
  JadwalHarianPage,
  AktivasiPage,
  DepositUangPage,
  DepositKelasPage,
  IzinInstrukturPage,
  PresensiKelasPage,
  PresensiGymPage,
  LaporanPendapatanPage,
  LaporanGymPage,
  LaporanKelasPage,
  LaporanKinerjaPage,
} from "./pages";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// const user = JSON.parse(localStorage.getItem("USER"));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/member" element={<MemberPage />} />
        <Route path="/instruktur" element={<InstrukturPage />} />
        <Route path="/jadwalUmum" element={<JadwalUmumPage />} />
        <Route path="/jadwalHarian" element={<JadwalHarianPage />} />
        <Route path="/aktivasi" element={<AktivasiPage />} />
        <Route path="/depositUang" element={<DepositUangPage />} />
        <Route path="/depositKelas" element={<DepositKelasPage />} />
        <Route path="/ijinInstruktur" element={<IzinInstrukturPage />} />
        <Route path="/presensiKelas" element={<PresensiKelasPage />} />
        <Route path="/presensiGym" element={<PresensiGymPage />} />
        <Route path="/laporanPendapatan" element={<LaporanPendapatanPage />} />
        <Route path="/laporanGym" element={<LaporanGymPage />} />
        <Route path="/laporanKelas" element={<LaporanKelasPage />} />
        <Route path="/laporanKinerja" element={<LaporanKinerjaPage />} />
      </Routes>
    </Router>
  );
};

export default App;
