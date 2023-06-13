import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaPencilAlt } from "react-icons/fa";
import { editJadwalHarian } from "../../utils/Api";

export default class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      jadwalHarian: props.jadwalHarian,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.jadwalHarian !== this.props.jadwalHarian) {
      this.setState({
        jadwalHarian: this.props.jadwalHarian,
      });
    }
  }

  handleShowEditModal = () => {
    this.setState({ showEditModal: true });
  };

  handleHideEditModal = () => {
    this.setState({
      showEditModal: false,
      jadwalHarian: this.props.jadwalHarian,
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      jadwalHarian: {
        ...prevState.jadwalHarian,
        [name]: value,
      },
    }));
  };

  handleEditJadwalHarian = (id) => {
    const { jadwalHarian } = this.state;
    const { STATUS_KELAS } = jadwalHarian;

    // Validasi
    if (!STATUS_KELAS) {
      Swal.fire("Peringatan", "Status Kelas Tidak Boleh Kosong!", "warning");
      return;
    }

    editJadwalHarian(id, jadwalHarian)
      .then((result) => {
        this.handleHideEditModal();
        this.props.onUpdateJadwalHarian(result); //mengoper data ke parent
        Swal.fire("Sukses!", "Berhasil Mengubah Jadwal Harian!", "success");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Gagal!", "Gagal Mengubah Jadwal Harian!", "error");
      });
  };

  render() {
    const { jadwalHarian } = this.state;

    return (
      <div>
        <FaPencilAlt style={{ color: "green", cursor: "pointer" }} onClick={this.handleShowEditModal} />
        <Modal />
        <Modal show={this.state.showEditModal} onHide={this.handleHideEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>UPDATE JADWAL HARIAN</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formBasicStatus">
                <Form.Label>Status Kelas</Form.Label>
                <Form.Control
                  name="STATUS_KELAS"
                  value={jadwalHarian.STATUS_KELAS}
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder="Status Kelas"
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleHideEditModal}>
              Batal
            </Button>
            <Button variant="primary" onClick={() => this.handleEditJadwalHarian(jadwalHarian.TANGGAL_JADWAL_HARIAN)}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
