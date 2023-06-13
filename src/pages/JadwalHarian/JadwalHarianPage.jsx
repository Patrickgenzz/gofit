import React, { Component } from "react";
import { getJadwalHarian, addJadwalHarian, cariJadwalHarian } from "../../utils/Api";
import { formatDate, formatTime } from "../../utils";
import SidebarComponent from "../../components/SidebarComponent";
import { Row, Table, Form } from "react-bootstrap";
import { FaCalendarAlt, FaSearch } from "react-icons/fa";
import Swal from "sweetalert2";
import { Button } from "react-bootstrap";
import ModalEdit from "./ModalEdit";

export default class JadwalHarianPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listJadwalHarian: [],
      cari: "",
    };
  }

  componentDidMount() {
    const tanggalGenerate = localStorage.getItem("TANGGAL_GENERATE");

    // if (tanggalGenerate) {
    const date = new Date();
    const dateGenerate = new Date(tanggalGenerate);

    if (date < dateGenerate || tanggalGenerate == null) {
      getJadwalHarian()
        .then((respon) => {
          this.setState({ listJadwalHarian: respon });
        })
        .catch((error) => {
          console.error(error);
        });
    } else {
      //reset tanggal generate dan hapus jadwal harian
      localStorage.removeItem("TANGGAL_GENERATE");
      // deleteJadwalHarian();
    }
  }

  generateJadwalHarian = () => {
    const date = new Date();
    const tanggalGenerate = localStorage.getItem("TANGGAL_GENERATE");
    const dateGenerate = new Date(tanggalGenerate);

    if (date < dateGenerate) {
      //make swal and show warning tanggal generate in the message
      Swal.fire("Peringatan", "Bisa Generate Kembali Pada Tanggal " + formatDate(tanggalGenerate), "warning");
      return;
    } else {
      Swal.fire({
        title: "Apakah Anda Yakin?",
        text: "Ingin Menggenerate Jadwal Harian!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Ya, Generate!",
      }).then((result) => {
        if (result.isConfirmed) {
          addJadwalHarian()
            .then((respon) => {
              //simpan tanggal generate hari tambah 7 hari ke depan dalam waktu indonesia dengan format Y-m-d H:i:s
              localStorage.setItem("TANGGAL_GENERATE", formatTime());
              this.setState({ listJadwalHarian: respon });
              Swal.fire("Sukses!", "Berhasil Menggenerate Jadwal Harian!", "success");
            })
            .catch((error) => {
              if (error.response.status === 400) {
                Swal.fire("Gagal!", "Jadwal Umum Tidak Ada!", "error");
              } else {
                console.error(error);
                Swal.fire("Gagal!", "Gagal Menggenerate Jadwal Harian!", "error");
              }
            });
        }
      });
    }
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      cari: {
        ...prevState.cari,
        [name]: value,
      },
    }));
  };

  handleSearch = (cari) => {
    cariJadwalHarian(cari)
      .then((result) => {
        Swal.fire("Sukses!", "Jadwal Harian Ditemukan!", "success");
        this.setState({ listJadwalHarian: result });
      })
      .catch((error) => {
        Swal.fire("Peringatan!", "Jadwal Harian Tidak Ditemukan!", "warning");
        console.error(error);
        this.setState({ cari: "" });
        this.componentDidMount();
      });
  };

  updatedListJadwalHarian = (result) => {
    const newList = [...this.state.listJadwalHarian];
    const index = newList.findIndex((jadwal) => jadwal.TANGGAL_JADWAL_HARIAN === result.TANGGAL_JADWAL_HARIAN);
    newList[index] = result;
    this.setState({ listJadwalHarian: newList });
  };

  render() {
    const { listJadwalHarian, cari } = this.state;
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const sessions = ["1", "2", "3", "4"];
    const date = new Date();
    const tanggalGenerate = localStorage.getItem("TANGGAL_GENERATE");
    const dateGenerate = new Date(tanggalGenerate);

    return (
      <div style={{ display: "flex" }}>
        <SidebarComponent />
        <section className="home-section">
          <div style={{ display: "flex", marginTop: "18px", justifyContent: "space-between", alignItems: "center" }}>
            <h1 style={{ margin: "0", fontSize: "28px", fontWeight: "bold", marginRight: "8px" }}>JADWAL HARIAN</h1>
            <Form className="d-flex mt-2">
              <Form.Control
                name="cari"
                onChange={this.handleInputChange}
                type="search"
                placeholder="Cari Jadwal Harian"
                className="me-2"
                aria-label="Search"
              />
              <div className="button-tambah">
                <Button variant="outline-primary" onClick={() => this.handleSearch(cari)}>
                  <FaSearch />
                </Button>
              </div>
            </Form>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
              }}
              className="button-tambah"
            >
              <Button variant={date < dateGenerate ? "danger" : "primary"} onClick={this.generateJadwalHarian}>
                <FaCalendarAlt style={{ marginRight: "10px" }}></FaCalendarAlt>
                Generate Jadwal
              </Button>
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
                      const jadwals = listJadwalHarian.filter((jadwal) => jadwal.HARI_JADWAL_UMUM === day && jadwal.SESI_JADWAL_UMUM === session);
                      if (jadwals.length === 0) {
                        return <td key={session}>-</td>;
                      } else {
                        return (
                          <td key={session}>
                            {jadwals.map((jadwalHarian) => (
                              <div
                                key={jadwalHarian.ID_JADWAL_UMUM}
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
                                  {jadwalHarian.NAMA_INSTRUKTUR}
                                  <br />
                                  {jadwalHarian.JENIS_KELAS}
                                  <br />
                                  {formatDate(jadwalHarian.TANGGAL_JADWAL_HARIAN)}
                                  <br />
                                  {jadwalHarian.STATUS_KELAS}
                                </div>
                                <div style={{ display: "flex", alignItems: "center" }}>
                                  <ModalEdit jadwalHarian={jadwalHarian} onUpdateJadwalHarian={this.updatedListJadwalHarian} />
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
