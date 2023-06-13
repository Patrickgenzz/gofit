import React, { Component } from "react";
import { Row, Table } from "react-bootstrap";
import { getDepositUang } from "../../utils/Api";
// import { FaTrash } from "react-icons/fa";
import { formatMoney } from "../../utils";
import ModalAdd from "./ModalAdd";
import Swal from "sweetalert2";
import { SidebarComponent } from "../../components";
import CetakDepositUang from "./CetakDepositUang";

export default class DepositUangPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listDepositUang: [],
    };
  }

  componentDidMount() {
    getDepositUang()
      .then((result) => {
        this.setState({ listDepositUang: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  addListDepositUang = (result) => {
    const newList = [...this.state.listDepositUang];
    newList.push(result);
    this.setState({ listDepositUang: newList });
    Swal.fire("Sukses!", "Berhasil Menambah Deposit Uang!", "success");
  };

  render() {
    const { listDepositUang } = this.state;

    return (
      <div style={{ display: "flex" }}>
        <SidebarComponent />
        <section className="home-section">
          <div style={{ display: "flex", marginTop: "18px" }}>
            <div style={{ display: "flex" }}>
              <h1 style={{ margin: "auto", marginRight: "15px" }}>DEPOSIT UANG</h1>
            </div>
            <ModalAdd onAddDepositUang={this.addListDepositUang} />
          </div>
          <hr />
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama Member</th>
                  <th>Nama Pegawai</th>
                  <th>Tanggal Deposit</th>
                  <th>Total Deposit</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {listDepositUang.map((depositUang, id) => (
                  <tr key={id}>
                    <td>{depositUang.ID_DEPOSIT_UANG}</td>
                    <td>{depositUang.NAMA_MEMBER}</td>
                    <td>{depositUang.NAMA_PEGAWAI}</td>
                    <td>{depositUang.TANGGAL_DEPOSIT_UANG}</td>
                    <td>Rp {formatMoney(depositUang.TOTAL_DEPOSIT_UANG)}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <CetakDepositUang depositUang={depositUang} />
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
