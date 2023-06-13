import React, { Component } from "react";
import { Row, Table, Form, Button } from "react-bootstrap";
import { getInstruktur, deleteInstruktur, cariInstruktur } from "../../utils/Api";
import { FaTrash, FaSearch } from "react-icons/fa";
import { formatDate } from "../../utils";
import Swal from "sweetalert2";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import { SidebarComponent } from "../../components";

export default class InstrukturPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listInstruktur: [],
      nama: "",
    };
  }

  componentDidMount() {
    getInstruktur()
      .then((result) => {
        this.setState({ listInstruktur: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleDelete(id) {
    Swal.fire({
      title: "Apakah Anda Yakin?",
      text: "Ingin Menghapus Instruktur Ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteInstruktur(id)
          .then(() => {
            const newList = this.state.listInstruktur.filter((instruktur) => instruktur.ID_INSTRUKTUR !== id);
            this.setState({ listInstruktur: newList });
            Swal.fire("Sukses!", "Berhasil Menghapus Instruktur!", "success");
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Gagal!", "Gagal Menghapus Instruktur!", "error");
          });
      }
    });
  }

  addListInstruktur = (result) => {
    console.log(result);
    const newList = [...this.state.listInstruktur];
    newList.push(result);
    this.setState({ listInstruktur: newList });
  };

  updatedListInstruktur = (result) => {
    const newList = [...this.state.listInstruktur];
    const index = newList.findIndex((instruktur) => instruktur.ID_INSTRUKTUR === result.ID_INSTRUKTUR);
    newList[index] = result;
    this.setState({ listInstruktur: newList });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      nama: {
        ...prevState.nama,
        [name]: value,
      },
    }));
  };

  handleSearch = (nama) => {
    cariInstruktur(nama)
      .then((result) => {
        Swal.fire("Sukses!", "Instruktur Ditemukan!", "success");
        this.setState({ listInstruktur: result });
      })
      .catch((error) => {
        Swal.fire("Peringatan!", "Instruktur Tidak Ditemukan!", "warning");
        console.error(error);
        this.setState({ nama: "" });
        this.componentDidMount();
      });
  };

  render() {
    const { listInstruktur, nama } = this.state;

    return (
      <div style={{ display: "flex" }}>
        <SidebarComponent />
        <section className="home-section">
          <div style={{ display: "flex", marginTop: "18px" }}>
            <div style={{ display: "flex" }}>
              <h1 style={{ margin: "auto", marginRight: "15px" }}>INSTRUKTUR</h1>
              <Form className="d-flex mt-2">
                <Form.Control
                  name="nama"
                  onChange={this.handleInputChange}
                  type="search"
                  placeholder="Cari Instruktur"
                  className="me-2"
                  aria-label="Search"
                />
                <div className="button-tambah">
                  <Button variant="outline-primary" onClick={() => this.handleSearch(nama)}>
                    <FaSearch />
                  </Button>
                </div>
              </Form>
            </div>
            <ModalAdd onAddInstruktur={this.addListInstruktur} />
          </div>
          <hr />
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Nama</th>
                  <th>Alamat</th>
                  <th>Tanggal Lahir</th>
                  <th>No Telepon</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {listInstruktur.map((instruktur, id) => (
                  <tr key={id}>
                    <td>{instruktur.ID_INSTRUKTUR}</td>
                    <td>{instruktur.NAMA_INSTRUKTUR}</td>
                    <td>{instruktur.ALAMAT_INSTRUKTUR}</td>
                    <td>{formatDate(instruktur.TANGGAL_LAHIR_INSTRUKTUR)}</td>
                    <td>{instruktur.NO_TELEPON_INSTRUKTUR}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ModalEdit instruktur={instruktur} onUpdateInstruktur={this.updatedListInstruktur} />
                        <FaTrash
                          style={{ marginTop: "3px", marginLeft: "10px", color: "red", cursor: "pointer" }}
                          onClick={() => this.handleDelete(instruktur.ID_INSTRUKTUR)}
                        />
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
