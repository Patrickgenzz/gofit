import React, { Component } from "react";
import { getListBookingKelasPaket, getListBookingKelasReguler } from "../../../utils/Api";
import { formatDateTime } from "../../../utils";
import { SidebarComponent } from "../../../components";
import { Row, Table } from "react-bootstrap";
import CetakKelasPaket from "./CetakKelasPaket";
import CetakKelasReguler from "./CetakKelasReguler";
// import CetakPresensiKelas from "./CetakPresensiKelas";

export default class PresensiKelasPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listBookingKelasPaket: [],
      listBookingKelasReguler: [],
    };
  }

  componentDidMount() {
    getListBookingKelasPaket()
      .then((result) => {
        this.setState({ listBookingKelasPaket: result });
      })
      .catch((error) => {
        console.error(error);
      });

    getListBookingKelasReguler()
      .then((result) => {
        this.setState({ listBookingKelasReguler: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    const { listBookingKelasPaket, listBookingKelasReguler } = this.state;
    const combinedData = [...listBookingKelasPaket, ...listBookingKelasReguler];
    combinedData.sort((a, b) => new Date(a.TANGGAL_DIBOOKING_KELAS) - new Date(b.TANGGAL_DIBOOKING_KELAS));

    return (
      <div style={{ display: "flex" }}>
        <SidebarComponent />
        <section className="home-section">
          <div style={{ display: "flex", marginTop: "18px" }}>
            <div style={{ display: "flex" }}>
              <h1 style={{ margin: "auto", marginRight: "15px" }}>PRESENSI KELAS</h1>
            </div>
          </div>
          <hr />
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Member</th>
                  <th>Instruktur</th>
                  <th>Kelas</th>
                  <th>Jenis</th>
                  <th>Tanggal Booking</th>
                  <th>Status</th>
                  <th>Waktu Presensi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {combinedData.map((kelas, id) => (
                  <tr key={id}>
                    <td>{kelas.ID_BOOKING_KELAS}</td>
                    <td>{kelas.NAMA_MEMBER}</td>
                    <td>{kelas.NAMA_INSTRUKTUR}</td>
                    <td>{kelas.JENIS_KELAS}</td>
                    <td>{kelas.TARIF_KELAS > 1 ? "Reguler" : "Paket"}</td>
                    <td>{formatDateTime(kelas.TANGGAL_DIBOOKING_KELAS)}</td>
                    <td>{kelas.STATUS}</td>
                    <td>{kelas.WAKTU_PRESENSI_KELAS ? formatDateTime(kelas.WAKTU_PRESENSI_KELAS) : "-"}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        {kelas.TARIF_KELAS > 1 ? <CetakKelasReguler kelas={kelas} /> : <CetakKelasPaket kelas={kelas} />}
                      </div>
                    </td>
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
