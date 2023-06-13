import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { addJadwalUmum, getInstruktur, getKelas } from "../../utils/Api";
import { FaPlusSquare } from "react-icons/fa";

export default class ModalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      instruktur: [],
      kelas: [],
      data: {
        ID_KELAS: "",
        ID_INSTRUKTUR: "",
        HARI_JADWAL_UMUM: "",
        SESI_JADWAL_UMUM: "",
      },
    };
  }

  componentDidMount() {
    getInstruktur()
      .then((result) => {
        this.setState({ instruktur: result });
      })
      .catch((error) => {
        console.error(error);
      });

    getKelas()
      .then((result) => {
        this.setState({ kelas: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  };

  handleShowAddModal = () => {
    this.setState({ showAddModal: true });
  };

  handleHideAddModal = () => {
    this.setState({
      showAddModal: false,
      data: {
        ID_KELAS: "",
        ID_INSTRUKTUR: "",
        HARI_JADWAL_UMUM: "",
        SESI_JADWAL_UMUM: "",
      },
    });
  };

  handleSaveJadwalUmum = (event) => {
    event.preventDefault();

    const { ID_KELAS, ID_INSTRUKTUR, HARI_JADWAL_UMUM, SESI_JADWAL_UMUM } = this.state.data;

    // Validasi
    if (!ID_KELAS) {
      Swal.fire("Peringatan", "Kelas Tidak Boleh Kosong!", "warning");
      return;
    }
    if (!ID_INSTRUKTUR) {
      Swal.fire("Peringatan", "Instruktur Tidak Boleh Kosong!", "warning");
      return;
    }
    if (!HARI_JADWAL_UMUM) {
      Swal.fire("Peringatan", "Hari Tidak Boleh Kosong!", "warning");
      return;
    }
    if (!SESI_JADWAL_UMUM) {
      Swal.fire("Peringatan", "Sesi Tidak Boleh Kosong!", "warning");
      return;
    }

    addJadwalUmum(this.state.data)
      .then((result) => {
        this.handleHideAddModal();
        this.props.onAddJadwalUmum(result); //mengoper data ke parent
      })
      .catch((error) => {
        if (error.response.status === 400) {
          Swal.fire("Gagal!", "Jadwal Instuktur Bertabrakan!", "error");
        } else {
          Swal.fire("Gagal!", "Gagal Menambah Jadwal Umum!", "error");
        }
      });
  };

  render() {
    const { data, kelas, instruktur } = this.state;
    const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    const sesi = ["1", "2", "3", "4"];

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
              <strong>TAMBAH JADWAL UMUM</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formKelas">
                <Form.Label>Kelas</Form.Label>
                <Form.Control as="select" value={data.ID_KELAS} name="ID_KELAS" onChange={this.handleInputChange}>
                  <option value="">Pilih Kelas</option>
                  {kelas.map((kelas) => (
                    <option key={kelas.id} value={kelas.ID_KELAS}>
                      {kelas.JENIS_KELAS}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formInstruktur">
                <Form.Label>Instruktur</Form.Label>
                <Form.Control as="select" value={data.ID_INSTRUKTUR} name="ID_INSTRUKTUR" onChange={this.handleInputChange}>
                  <option value="">Pilih Instruktur</option>
                  {instruktur.map((instruktur) => (
                    <option key={instruktur.id} value={instruktur.ID_INSTRUKTUR}>
                      {instruktur.NAMA_INSTRUKTUR}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formHari">
                <Form.Label>Hari</Form.Label>
                <Form.Control as="select" value={data.HARI_JADWAL_UMUM} name="HARI_JADWAL_UMUM" onChange={this.handleInputChange}>
                  <option value="">Pilih Hari</option>
                  {hari.map((hari) => (
                    <option key={hari} value={hari}>
                      {hari}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formSesi">
                <Form.Label>Sesi</Form.Label>
                <Form.Control as="select" value={data.SESI_JADWAL_UMUM} name="SESI_JADWAL_UMUM" onChange={this.handleInputChange}>
                  <option value="">Pilih Sesi</option>
                  {sesi.map((sesi) => (
                    <option key={sesi} value={sesi}>
                      {sesi}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleHideAddModal}>
              Tutup
            </Button>
            <Button variant="primary" onClick={this.handleSaveJadwalUmum}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
