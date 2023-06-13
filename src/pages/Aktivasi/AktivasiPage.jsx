import React, { Component } from "react";
import { Row, Table } from "react-bootstrap";
import { getAktivasi } from "../../utils/Api";
// import { FaTrash } from "react-icons/fa";
import { formatMoney } from "../../utils";
import ModalAdd from "./ModalAdd";
import Swal from "sweetalert2";
import { SidebarComponent } from "../../components";
import CetakAktivasi from "./CetakAktivasi";

export default class AktivasiPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listAktivasi: [],
    };
  }

  componentDidMount() {
    getAktivasi()
      .then((result) => {
        this.setState({ listAktivasi: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addListAktivasi = (result) => {
    const newList = [...this.state.listAktivasi];
    newList.push(result);
    this.setState({ listAktivasi: newList });
    Swal.fire("Sukses!", "Berhasil Menambah Aktivasi!", "success");
  };

  render() {
    const { listAktivasi } = this.state;

    return (
      <div style={{ display: "flex" }}>
        <SidebarComponent />
        <section className="home-section">
          <div style={{ display: "flex", marginTop: "18px" }}>
            <div style={{ display: "flex" }}>
              <h1 style={{ margin: "auto", marginRight: "15px" }}>AKTIVASI</h1>
            </div>
            <ModalAdd onAddAktivasi={this.addListAktivasi} />
          </div>
          <hr />
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Member</th>
                  <th>Nama Pegawai</th>
                  <th>Tanggal Aktivasi</th>
                  <th>Masa Berlaku</th>
                  <th>Jumlah Pembayaran</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {listAktivasi.map((aktivasi, id) => (
                  <tr key={id}>
                    <td>{aktivasi.ID_AKTIVASI}</td>
                    <td>{aktivasi.NAMA_MEMBER}</td>
                    <td>{aktivasi.NAMA_PEGAWAI}</td>
                    <td>{aktivasi.TANGGAL_AKTIVASI}</td>
                    <td>{aktivasi.MASA_BERLAKU_AKTIVASI}</td>
                    <td>Rp {formatMoney(aktivasi.JUMLAH_PEMBAYARAN)}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CetakAktivasi aktivasi={aktivasi} />
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
