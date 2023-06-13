import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { addMember } from "../../utils/Api";
import { FaPlusSquare } from "react-icons/fa";

export default class ModalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      data: {
        NAMA_MEMBER: "",
        ALAMAT_MEMBER: "",
        TANGGAL_LAHIR_MEMBER: "",
        NO_TELEPON_MEMBER: "",
        EMAIL: "",
      },
    };
  }

  handleShowAddModal = () => {
    this.setState({ showAddModal: true });
  };

  handleHideAddModal = () => {
    this.setState({
      showAddModal: false,
      data: {
        NAMA_MEMBER: "",
        ALAMAT_MEMBER: "",
        TANGGAL_LAHIR_MEMBER: "",
        NO_TELEPON_MEMBER: "",
        EMAIL: "",
      },
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  };

  handleSaveMember = (event) => {
    event.preventDefault();

    const { NAMA_MEMBER, ALAMAT_MEMBER, TANGGAL_LAHIR_MEMBER, NO_TELEPON_MEMBER, EMAIL } = this.state.data;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const noTeleponRegex = /^08[0-9]{10,11}$/;
    const today = new Date();
    const tanggalLahir = new Date(TANGGAL_LAHIR_MEMBER);

    // Validasi
    if (!NAMA_MEMBER) {
      Swal.fire("Peringatan!", "Nama Tidak Boleh Kosong!", "warning");
      return;
    }

    if (!ALAMAT_MEMBER) {
      Swal.fire("Peringatan!", "Alamat Tidak Boleh Kosong!", "warning");
      return;
    }

    if (!TANGGAL_LAHIR_MEMBER) {
      Swal.fire("Peringatan!", "Tanggal Lahir Tidak Boleh Kosong!", "warning");
      return;
    } else if (tanggalLahir > today) {
      Swal.fire("Peringatan!", "Tanggal Lahir Tidak Boleh Lebih Dari Hari Ini!", "warning");
      return;
    }

    if (!NO_TELEPON_MEMBER) {
      Swal.fire("Peringatan!", "No Telepon Tidak Boleh Kosong!", "warning");
      return;
    } else if (!noTeleponRegex.test(NO_TELEPON_MEMBER)) {
      Swal.fire("Peringatan!", "No Telepon Harus (12-13 Digit)!", "warning");
      return;
    }

    if (!EMAIL) {
      Swal.fire("Peringatan!", "Email Tidak Boleh Kosong!", "warning");
      return;
    } else if (!emailRegex.test(EMAIL)) {
      Swal.fire("Peringatan!", "Email Tidak Valid!", "warning");
      return;
    }

    addMember(this.state.data)
      .then((result) => {
        this.handleHideAddModal();
        this.props.onAddMember(result); //mengoper data ke parent
        Swal.fire("Sukses!", "Berhasil Menambah Member!", "success");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Gagal!", "Gagal Menambah Member!", "error");
      });
  };

  render() {
    return (
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
        }}
        className="button-tambah"
      >
        <Button color="purple darken-4" dark onClick={this.handleShowAddModal}>
          <FaPlusSquare style={{ marginRight: "10px" }}></FaPlusSquare>
          Tambah
        </Button>
        <Modal />
        <Modal show={this.state.showAddModal} onHide={this.handleHideAddModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>TAMBAH MEMBER</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control name="NAMA_MEMBER" onChange={this.handleInputChange} type="text" placeholder="Nama Member" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAlamat">
                <Form.Label>Alamat</Form.Label>
                <Form.Control name="ALAMAT_MEMBER" onChange={this.handleInputChange} type="text" placeholder="Alamat Member" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicTanggalLahir">
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control name="TANGGAL_LAHIR_MEMBER" onChange={this.handleInputChange} type="date" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNoTelepon">
                <Form.Label>No Telepon</Form.Label>
                <Form.Control name="NO_TELEPON_MEMBER" onChange={this.handleInputChange} type="text" placeholder="No Telepon Member" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control name="EMAIL" onChange={this.handleInputChange} type="text" placeholder="Email" required />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleHideAddModal}>
              Tutup
            </Button>
            <Button variant="primary" onClick={this.handleSaveMember}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
