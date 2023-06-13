import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaPencilAlt } from "react-icons/fa";
import { editMember } from "../../utils/Api";
import { formatDateShow } from "../../utils";

export default class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      member: props.member,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.member !== this.props.member) {
      this.setState({
        member: this.props.member,
      });
    }
  }

  handleShowEditModal = () => {
    this.setState({ showEditModal: true });
  };

  handleHideEditModal = () => {
    this.setState({
      showEditModal: false,
      member: this.props.member,
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      member: {
        ...prevState.member,
        [name]: value,
      },
    }));
  };

  handleEditMember = (id) => {
    const { member } = this.state;
    const { NAMA_MEMBER, ALAMAT_MEMBER, TANGGAL_LAHIR_MEMBER, NO_TELEPON_MEMBER } = member;

    const noTeleponRegex = /^08[0-9]{10,11}$/;
    const today = new Date();
    const tanggalLahir = new Date(TANGGAL_LAHIR_MEMBER);

    // Validasi
    if (!NAMA_MEMBER) {
      Swal.fire("Peringatan", "Nama Tidak Boleh Kosong!", "warning");
      return;
    }

    if (!ALAMAT_MEMBER) {
      Swal.fire("Peringatan", "Alamat Tidak Boleh Kosong!", "warning");
      return;
    }

    if (!TANGGAL_LAHIR_MEMBER) {
      Swal.fire("Peringatan", "Tanggal Lahir Tidak Boleh Kosong!", "warning");
      return;
    } else if (tanggalLahir > today) {
      Swal.fire("Peringatan!", "Tanggal Lahir Tidak Boleh Lebih Dari Hari Ini!", "warning");
      return;
    }

    if (!NO_TELEPON_MEMBER) {
      Swal.fire("Peringatan", "No Telepon Tidak Boleh Kosong!", "warning");
      return;
    } else if (!noTeleponRegex.test(NO_TELEPON_MEMBER)) {
      Swal.fire("Error", "No Telepon Harus (12-13 Digit)!", "warning");
      return;
    }

    // Kirim data ke API
    editMember(id, member)
      .then((result) => {
        this.handleHideEditModal();
        this.props.onUpdateMember(result); //mengoper data ke parent
        Swal.fire("Sukses!", "Berhasil Mengubah Member!", "success");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Gagal!", "Gagal Mengubah Member!", "error");
      });
  };

  render() {
    const { member } = this.state;
    return (
      <div>
        <FaPencilAlt style={{ color: "green", cursor: "pointer" }} onClick={this.handleShowEditModal} />
        <Modal />
        <Modal show={this.state.showEditModal} onHide={this.handleHideEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>UPDATE MEMBER</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  name="NAMA_MEMBER"
                  value={member.NAMA_MEMBER}
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="Nama Member"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAlamat">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  name="ALAMAT_MEMBER"
                  value={member.ALAMAT_MEMBER}
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="Alamat Member"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicTanggalLahir">
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control
                  name="TANGGAL_LAHIR_MEMBER"
                  value={formatDateShow(member.TANGGAL_LAHIR_MEMBER)}
                  onChange={this.handleInputChange}
                  type="date"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNoTelepon">
                <Form.Label>No Telepon</Form.Label>
                <Form.Control
                  name="NO_TELEPON_MEMBER"
                  value={member.NO_TELEPON_MEMBER}
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="No Telepon Member"
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleHideEditModal}>
              Batal
            </Button>
            <Button variant="primary" onClick={() => this.handleEditMember(member.ID_MEMBER)}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
