import React, { Component } from "react";
import { getJadwalUmum, deleteJadwalUmum } from "../../utils/Api";
import SidebarComponent from "../../components/SidebarComponent";
import { Row, Table } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import ModalAdd from "./ModalAdd";
import Swal from "sweetalert2";
import ModalEdit from "./ModalEdit";

export default class JadwalUmumPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listJadwalUmum: [],
    };
  }

  componentDidMount() {
    getJadwalUmum()
      .then((result) => {
        this.setState({ listJadwalUmum: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addListJadwalUmum = (result) => {
    const newList = [...this.state.listJadwalUmum];
    newList.push(result);
    this.setState({ listJadwalUmum: newList });
    Swal.fire("Sukses!", "Berhasil Menambah Jadwal Umum!", "success");
  };

  updatedListJadwalUmum = (result) => {
    const newList = [...this.state.listJadwalUmum];
    const index = newList.findIndex((jadwalUmum) => jadwalUmum.ID_JADWAL_UMUM === result.ID_JADWAL_UMUM);
    newList[index] = result;
    this.setState({ listJadwalUmum: newList });
  };

  handleDelete(id) {
    const date = new Date();
    const tanggalGenerate = localStorage.getItem("TANGGAL_GENERATE");
    const dateGenerate = new Date(tanggalGenerate);

    if (date < dateGenerate) {
      Swal.fire("Peringatan", "Tidak Bisa Menghapus Jadwal Jika Sudah Digenerate!", "warning");
      return;
    } else {
      Swal.fire({
        title: "Apakah Anda Yakin?",
        text: "Ingin Menghapus Jadwal Ini!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Hapus!",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteJadwalUmum(id)
            .then(() => {
              const newList = this.state.listJadwalUmum.filter((jadwal) => jadwal.ID_JADWAL_UMUM !== id);
              this.setState({ listJadwalUmum: newList });
              Swal.fire("Sukses!", "Berhasil Menghapus Jadwal!", "success");
            })
            .catch((error) => {
              console.error(error);
              Swal.fire("Gagal!", "Gagal Menghapus Jadwal!", "error");
            });
        }
      });
    }
  }

  render() {
    const { listJadwalUmum } = this.state;
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const sessions = ["1", "2", "3", "4"];

    return (
      <div style={{ display: "flex" }}>
        <SidebarComponent />
        <section className="home-section">
          <div style={{ display: "flex", marginTop: "18px", justifyContent: "space-between", alignItems: "center" }}>
            <h1 style={{ margin: "0", fontSize: "28px", fontWeight: "bold" }}>JADWAL UMUM</h1>
            <div style={{ display: "flex", gap: "2px" }}>
              <ModalAdd onAddJadwalUmum={this.addListJadwalUmum} />
            </div>
          </div>
          <hr />
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Hari</th>
                  <th>Sesi 1 (08.00 am)</th>
                  <th>Sesi 2 (09.30 am)</th>
                  <th>Sesi 3 (17.00 pm)</th>
                  <th>Sesi 4 (18.30 pm)</th>
                </tr>
              </thead>
              <tbody>
                {days.map((day) => (
                  <tr key={day}>
                    <td>{day}</td>
                    {sessions.map((session) => {
                      const jadwals = listJadwalUmum.filter((jadwal) => jadwal.HARI_JADWAL_UMUM === day && jadwal.SESI_JADWAL_UMUM === session);
                      if (jadwals.length === 0) {
                        return <td key={session}>-</td>;
                      } else {
                        return (
                          <td key={session}>
                            {jadwals.map((jadwal) => (
                              <div
                                key={jadwal.ID_JADWAL_UMUM}
                                style={{
                                  display: "flex",
                                  justifyContent: "space-between",
                                  alignItems: "center",
                                  padding: "10px",
                                  margin: "10px 0",
                                  border: "1px solid #ccc",
                                  borderRadius: "5px",
                                }}
                              >
                                <div>
                                  <h6>{jadwal.NAMA_INSTRUKTUR}</h6>
                                  {jadwal.JENIS_KELAS}
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                  <ModalEdit jadwalUmum={jadwal} onUpdateJadwalUmum={this.updatedListJadwalUmum} />
                                  <FaTrash
                                    style={{ marginTop: "4px", marginLeft: "10px", color: "red", cursor: "pointer" }}
                                    onClick={() => this.handleDelete(jadwal.ID_JADWAL_UMUM)}
                                  />
                                </div>
                              </div>
                            ))}
                          </td>
                        );
                      }
                    })}
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </section>
      </div>
    );
  }
}
