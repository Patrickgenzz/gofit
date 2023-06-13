import axios from "axios";
import { BASE_URL } from "./constants";

/* Api Authentication*/
export const login = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/authentication/login`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const gantiPasswordAPI = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/authentication/gantiPassword`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* Api Member */
export const getMember = async () => {
  const response = await axios.get(`${BASE_URL}/member/`);
  return response.data;
};
export const deleteMember = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/member/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const addMember = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/member/create`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const editMember = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/member/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const cariMember = async (nama) => {
  try {
    const response = await axios.get(`${BASE_URL}/member/find/${nama.nama}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const resetPassword = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/member/resetPassword/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* Api Instruktur */
export const getInstruktur = async () => {
  const response = await axios.get(`${BASE_URL}/instruktur/`);
  return response.data;
};
export const deleteInstruktur = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/instruktur/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const addInstruktur = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/instruktur/create`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const editInstruktur = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/instruktur/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const cariInstruktur = async (nama) => {
  try {
    const response = await axios.get(`${BASE_URL}/instruktur/find/${nama.nama}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* Api Jadwal Umum */
export const getJadwalUmum = async () => {
  const response = await axios.get(`${BASE_URL}/jadwalUmum/`);
  return response.data;
};
export const deleteJadwalUmum = async (id) => {
  try {
    const response = await axios.delete(`${BASE_URL}/jadwalUmum/delete/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const addJadwalUmum = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/jadwalUmum/create`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const editJadwalUmum = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/jadwalUmum/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* Api Jadwal Harian */
export const getJadwalHarian = async () => {
  const response = await axios.get(`${BASE_URL}/jadwalHarian/`);
  return response.data;
};
export const addJadwalHarian = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/jadwalHarian/create`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
// export const deleteJadwalHarian = async () => {
//   try {
//     const response = await axios.post(`${BASE_URL}/jadwalHarian/delete`);
//     console.log(response);
//   } catch (error) {
//     console.error(error);
//     throw error;
//   }
// };
export const cariJadwalHarian = async (cari) => {
  try {
    const response = await axios.get(`${BASE_URL}/jadwalHarian/find/${cari.cari}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
export const editJadwalHarian = async (id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}/jadwalHarian/update/${id}`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* Api Transaksi Aktivasi */
export const getAktivasi = async () => {
  const response = await axios.get(`${BASE_URL}/transaksiAktivasi/`);
  return response.data;
};
export const addAktivasi = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/transaksiAktivasi/create`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* Api Transaksi Deposit Uang */
export const getDepositUang = async () => {
  const response = await axios.get(`${BASE_URL}/transaksiDepositUang/`);
  return response.data;
};
export const addDepositUang = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/transaksiDepositUang/create`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* Api Deposit Kelas */
export const getDepositKelas = async () => {
  const response = await axios.get(`${BASE_URL}/transaksiDepositKelas/`);
  return response.data;
};
export const addDepositKelas = async (data) => {
  try {
    const response = await axios.post(`${BASE_URL}/transaksiDepositKelas/create`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* Api Izin Instruktur */
export const getIzinInstruktur = async () => {
  const response = await axios.get(`${BASE_URL}/izinInstruktur/`);
  return response.data;
};
export const konfirmasiIzinInstruktur = async (id, tanggal) => {
  try {
    const response = await axios.put(`${BASE_URL}/izinInstruktur/update/${id}/${tanggal}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* Api Presensi Kelas */
export const getListBookingKelasPaket = async () => {
  const response = await axios.get(`${BASE_URL}/presensiBookingKelas/bookingKelasPaket`);
  return response.data;
};
export const getListBookingKelasReguler = async () => {
  const response = await axios.get(`${BASE_URL}/presensiBookingKelas/bookingKelasReguler`);
  return response.data;
};
export const getListBookingGym = async () => {
  const response = await axios.get(`${BASE_URL}/presensiBookingGym/`);
  return response.data;
};
export const konfirmasiBookingGym = async (id) => {
  try {
    const response = await axios.put(`${BASE_URL}/presensiBookingGym/update/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

/* Api kelas */
export const getKelas = async () => {
  const response = await axios.get(`${BASE_URL}/kelas/`);
  return response.data;
};

/* Api Promo */
export const getPromo = async () => {
  const response = await axios.get(`${BASE_URL}/promo/`);
  return response.data;
};

/* Api Laporan */
export const getLaporanPendapatan = async () => {
  const response = await axios.get(`${BASE_URL}/laporan/laporanPendapatanBulanan`);
  return response.data;
};
export const getLaporanGym = async () => {
  const response = await axios.get(`${BASE_URL}/laporan/laporanAktivitasGym`);
  return response.data;
};
export const getLaporanKinerja = async () => {
  const response = await axios.get(`${BASE_URL}/laporan/laporanKinerja`);
  return response.data;
};
export const getLaporanKelas = async () => {
  const response = await axios.get(`${BASE_URL}/laporan/laporanAktivitasKelas`);
  return response.data;
};

/* Api Cari Laporan */
export const getFindLaporanPendapatan = async (tahun) => {
  try {
    const response = await axios.get(`${BASE_URL}/laporan/findLaporanPendapatanBulanan/${tahun.tahun}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getFindLaporanKinerja = async (tahun, bulan) => {
  try {
    const response = await axios.get(`${BASE_URL}/laporan/findLaporanKinerja/${tahun.tahun}/${bulan.bulan}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getFindLaporanAktivitasGym = async (tahun, bulan) => {
  try {
    const response = await axios.get(`${BASE_URL}/laporan/findLaporanAktivitasGym/${tahun.tahun}/${bulan.bulan}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
export const getFindLaporanAktivitasKelas = async (tahun, bulan) => {
  try {
    const response = await axios.get(`${BASE_URL}/laporan/findLaporanAktivitasKelas/${tahun.tahun}/${bulan.bulan}`);
    return response.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
