import React, { Component } from "react";
import { Row, Table, Form, Button } from "react-bootstrap";
import { getMember, deleteMember, cariMember, resetPassword } from "../../utils/Api";
import { FaTrash, FaSearch, FaKey } from "react-icons/fa";
import { formatDate } from "../../utils";
import { SidebarComponent } from "../../components";
import Swal from "sweetalert2";
import ModalAdd from "./ModalAdd";
import ModalEdit from "./ModalEdit";
import CetakMemberCard from "./CetakMemberCard";

export default class MemberPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listMember: [],
      nama: "",
    };
  }

  componentDidMount() {
    getMember()
      .then((result) => {
        this.setState({ listMember: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleDelete(id) {
    Swal.fire({
      title: "Apakah Anda Yakin?",
      text: "Ingin Menghapus Member Ini!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Hapus!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteMember(id)
          .then(() => {
            const newList = this.state.listMember.filter((member) => member.ID_MEMBER !== id);
            this.setState({ listMember: newList });
            Swal.fire("Sukses!", "Berhasil Menghapus Member!", "success");
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Gagal!", "Gagal Menghapus Member!", "error");
          });
      }
    });
  }

  handleReset(id) {
    Swal.fire({
      title: "Apakah Anda Yakin?",
      text: "Ingin Mereset Password!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Reset!",
    }).then((result) => {
      if (result.isConfirmed) {
        resetPassword(id)
          .then(() => {
            Swal.fire("Sukses!", "Berhasil Mereset Password!", "success");
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Gagal!", "Gagal Mereset Password!", "error");
          });
      }
    });
  }

  addListMember = (result) => {
    const newList = [...this.state.listMember];
    newList.push(result);
    this.setState({ listMember: newList });
  };

  updatedListMember = (result) => {
    const newList = [...this.state.listMember];
    const index = newList.findIndex((member) => member.ID_MEMBER === result.ID_MEMBER);
    newList[index] = result;
    this.setState({ listMember: newList });
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
    cariMember(nama)
      .then((result) => {
        Swal.fire("Sukses!", "Member Ditemukan!", "success");
        this.setState({ listMember: result });
      })
      .catch((error) => {
        Swal.fire("Peringatan!", "Member Tidak Ditemukan!", "warning");
        console.error(error);
        this.setState({ nama: "" });
        this.componentDidMount();
      });
  };

  render() {
    const { listMember, nama } = this.state;

    return (
      <div style={{ display: "flex" }}>
        <SidebarComponent />
        <section className="home-section">
          <div style={{ display: "flex", marginTop: "18px" }}>
            <div style={{ display: "flex" }}>
              <h1 style={{ margin: "auto", marginRight: "15px" }}>MEMBER</h1>
              <Form className="d-flex mt-2">
                <Form.Control
                  name="nama"
                  onChange={this.handleInputChange}
                  type="search"
                  placeholder="Cari Member"
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
            <ModalAdd onAddMember={this.addListMember} />
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
                {listMember.map((member, id) => (
                  <tr key={id}>
                    <td>{member.ID_MEMBER}</td>
                    <td>{member.NAMA_MEMBER}</td>
                    <td>{member.ALAMAT_MEMBER}</td>
                    <td>{formatDate(member.TANGGAL_LAHIR_MEMBER)}</td>
                    <td>{member.NO_TELEPON_MEMBER}</td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <ModalEdit member={member} onUpdateMember={this.updatedListMember} />
                        <FaTrash
                          style={{ marginTop: "4px", marginLeft: "10px", color: "red", cursor: "pointer" }}
                          onClick={() => this.handleDelete(member.ID_MEMBER)}
                        />
                        <FaKey
                          style={{ marginTop: "4px", marginLeft: "10px", color: "purple", cursor: "pointer" }}
                          onClick={() => this.handleReset(member.ID_MEMBER)}
                        />
                        <CetakMemberCard member={member} />
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
