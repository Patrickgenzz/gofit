import React, { Component } from "react";
import { Row, Table } from "react-bootstrap";
import { getIzinInstruktur } from "../../utils/Api";
import { formatDateTime } from "../../utils";
import { SidebarComponent } from "../../components";
import ModalAdd from "./ModalAdd";

export default class IzinInstrukturPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listIzinInstruktur: [],
    };
  }

  componentDidMount() {
    getIzinInstruktur()
      .then((result) => {
        this.setState({ listIzinInstruktur: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updatedIzinInstruktur = (result) => {
    const newList = [...this.state.listIzinInstruktur];
    const index = newList.findIndex((izin) => izin.ID_IZIN_INSTRUKTUR === result.ID_IZIN_INSTRUKTUR);
    newList[index] = result;
    this.setState({ listIzinInstruktur: newList });
  };

  render() {
    const { listIzinInstruktur } = this.state;
    return (
      <div style={{ display: "flex" }}>
        <SidebarComponent />
        <section className="home-section">
          <div style={{ display: "flex", marginTop: "18px" }}>
            <div style={{ display: "flex" }}>
              <h1 style={{ margin: "auto", marginRight: "15px" }}>IZIN INSTRUKTUR</h1>
            </div>
            <ModalAdd listIzinInstruktur={listIzinInstruktur} onUpdateIzinInstruktur={this.updatedIzinInstruktur} />
          </div>
          <hr />
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Instruktur Pengganti</th>
                  <th>Tanggal Pembuatan Izin</th>
                  <th>Izin Pada Tanggal</th>
                  <th>Alasan Izin</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {listIzinInstruktur
                  .filter((izin) => izin.STATUS_KONFIRMASI_IZIN === "Dikonfirmasi")
                  .map((izin, id) => (
                    <tr key={id}>
                      <td>{izin.ID_IZIN_INSTRUKTUR}</td>
                      <td>{izin.NAMA_INSTRUKTUR}</td>
                      <td>{izin.INSTRUKTUR_PENGGANTI}</td>
                      <td>{formatDateTime(izin.TANGGAL_PEMBUATAN)}</td>
                      <td>{formatDateTime(izin.TANGGAL_IZIN)}</td>
                      <td>{izin.ALASAN_IZIN}</td>
                      <td>{izin.STATUS_KONFIRMASI_IZIN}</td>
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
