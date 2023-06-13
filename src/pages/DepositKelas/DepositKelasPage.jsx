import React, { Component } from "react";
import { Row, Table } from "react-bootstrap";
import { getDepositKelas } from "../../utils/Api";
// import { FaTrash } from "react-icons/fa";
import CetakDepositKelas from "./CetakDepositKelas";
import ModalAdd from "./ModalAdd";
import Swal from "sweetalert2";
import { SidebarComponent } from "../../components";

export default class DepositKelasPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listDepositKelas: [],
    };
  }

  componentDidMount() {
    getDepositKelas()
      .then((result) => {
        this.setState({ listDepositKelas: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addListDepositKelas = (result) => {
    const newList = [...this.state.listDepositKelas];
    newList.push(result);
    this.setState({ listDepositKelas: newList });
    Swal.fire("Sukses!", "Berhasil Menambah Deposit Kelas !", "success");
  };

  render() {
    const { listDepositKelas } = this.state;

    return (
      <div style={{ display: "flex" }}>
        <SidebarComponent />
        <section className="home-section">
          <div style={{ display: "flex", marginTop: "18px" }}>
            <div style={{ display: "flex" }}>
              <h1 style={{ margin: "auto", marginRight: "15px" }}>DEPOSIT KELAS</h1>
            </div>
            <ModalAdd onAddDepositKelas={this.addListDepositKelas} />
          </div>
          <hr />
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Member</th>
                  <th>Nama Pegawai</th>
                  <th>Promo</th>
                  <th>Kelas</th>
                  <th>Tanggal Deposit</th>
                  <th>Jumlah Deposit</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {listDepositKelas.map((depositKelas, id) => (
                  <tr key={id}>
                    <td>{depositKelas.ID_DEPOSIT_KELAS}</td>
                    <td>{depositKelas.NAMA_MEMBER}</td>
                    <td>{depositKelas.NAMA_PEGAWAI}</td>
                    <td>{depositKelas.JENIS_PROMO}</td>
                    <td>{depositKelas.JENIS_KELAS}</td>
                    <td>{depositKelas.TANGGAL_DEPOSIT_KELAS}</td>
                    <td>{depositKelas.TOTAL_DEPOSIT_KELAS}</td>
                    <td>
                      {
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CetakDepositKelas depositKelas={depositKelas} />
                        </div>
                      }
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
