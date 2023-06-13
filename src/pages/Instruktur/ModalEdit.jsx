import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaPencilAlt } from "react-icons/fa";
import { editInstruktur } from "../../utils/Api";
import { formatDateShow } from "../../utils";

export default class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      instruktur: props.instruktur,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.instruktur !== this.props.instruktur) {
      this.setState({
        instruktur: this.props.instruktur,
      });
    }
  }

  handleShowEditModal = () => {
    this.setState({ showEditModal: true });
  };

  handleHideEditModal = () => {
    this.setState({
      showEditModal: false,
      instruktur: this.props.instruktur,
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      instruktur: {
        ...prevState.instruktur,
        [name]: value,
      },
    }));
  };

  handleEditInstruktur = (id) => {
    const { instruktur } = this.state;
    const { NAMA_INSTRUKTUR, ALAMAT_INSTRUKTUR, TANGGAL_LAHIR_INSTRUKTUR, NO_TELEPON_INSTRUKTUR } = instruktur;

    // Validasi
    const noTeleponRegex = /^08[0-9]{10,11}$/;

    if (!NAMA_INSTRUKTUR) {
      Swal.fire("Peringatan", "Nama Tidak Boleh Kosong!", "warning");
      return;
    }

    if (!ALAMAT_INSTRUKTUR) {
      Swal.fire("Peringatan", "Alamat Tidak Boleh Kosong!", "warning");
      return;
    }

    if (!TANGGAL_LAHIR_INSTRUKTUR) {
      Swal.fire("Peringatan", "Tanggal Lahir Tidak Boleh Kosong!", "warning");
      return;
    }

    if (!NO_TELEPON_INSTRUKTUR) {
      Swal.fire("Peringatan", "No Telepon Tidak Boleh Kosong!", "warning");
      return;
    } else if (!noTeleponRegex.test(NO_TELEPON_INSTRUKTUR)) {
      Swal.fire("Error", "No Telepon Harus (12-13 Digit)!", "warning");
      return;
    }

    // Kirim data ke API
    editInstruktur(id, instruktur)
      .then((result) => {
        this.handleHideEditModal();
        this.props.onUpdateInstruktur(result); //mengoper data ke parent
        Swal.fire("Sukses!", "Berhasil Mengubah Instruktur!", "success");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Gagal!", "Gagal Mengubah Instruktur!", "error");
      });
  };

  render() {
    const { instruktur } = this.state;
    return (
      <div>
        <FaPencilAlt style={{ color: "green", cursor: "pointer" }} onClick={this.handleShowEditModal} />
        <Modal />
        <Modal show={this.state.showEditModal} onHide={this.handleHideEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>UPDATE INSTRUKTUR</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicNama">
                <Form.Label>Nama</Form.Label>
                <Form.Control
                  name="NAMA_INSTRUKTUR"
                  value={instruktur.NAMA_INSTRUKTUR}
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="Nama Instruktur"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicAlamat">
                <Form.Label>Alamat</Form.Label>
                <Form.Control
                  name="ALAMAT_INSTRUKTUR"
                  value={instruktur.ALAMAT_INSTRUKTUR}
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="Alamat Instruktur"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicTanggalLahir">
                <Form.Label>Tanggal Lahir</Form.Label>
                <Form.Control
                  name="TANGGAL_LAHIR_INSTRUKTUR"
                  value={formatDateShow(instruktur.TANGGAL_LAHIR_INSTRUKTUR)}
                  onChange={this.handleInputChange}
                  type="date"
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicNoTelepon">
                <Form.Label>No Telepon</Form.Label>
                <Form.Control
                  name="NO_TELEPON_INSTRUKTUR"
                  value={instruktur.NO_TELEPON_INSTRUKTUR}
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="No Telepon Instruktur"
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleHideEditModal}>
              Batal
            </Button>
            <Button variant="primary" onClick={() => this.handleEditInstruktur(instruktur.ID_INSTRUKTUR)}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
