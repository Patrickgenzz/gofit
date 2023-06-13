import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaPencilAlt } from "react-icons/fa";
import { editJadwalUmum, getKelas, getInstruktur } from "../../utils/Api";

export default class ModalEdit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      instruktur: [],
      kelas: [],
      jadwalUmum: props.jadwalUmum,
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

  componentDidUpdate(prevProps) {
    if (prevProps.jadwalUmum !== this.props.jadwalUmum) {
      this.setState({
        jadwalUmum: this.props.jadwalUmum,
      });
    }
  }

  handleShowEditModal = () => {
    const date = new Date();
    const tanggalGenerate = localStorage.getItem("TANGGAL_GENERATE");
    const dateGenerate = new Date(tanggalGenerate);

    if (date < dateGenerate) {
      Swal.fire("Peringatan", "Tidak Bisa Mengedit Jadwal Jika Sudah Digenerate!", "warning");
      return;
    } else {
      this.setState({ showEditModal: true });
    }
  };

  handleHideEditModal = () => {
    this.setState({
      showEditModal: false,
      jadwalUmum: this.props.jadwalUmum,
    });
  };

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      jadwalUmum: {
        ...prevState.jadwalUmum,
        [name]: value,
      },
    }));
  };

  handleEditJadwalUmum = (id) => {
    const { jadwalUmum } = this.state;
    const { ID_KELAS, ID_INSTRUKTUR, HARI_JADWAL_UMUM, SESI_JADWAL_UMUM } = jadwalUmum;

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

    // Kirim data ke API
    editJadwalUmum(id, jadwalUmum)
      .then((result) => {
        this.handleHideEditModal();
        this.props.onUpdateJadwalUmum(result);
        Swal.fire("Sukses!", "Berhasil Mengubah Jadwal Umum!", "success");
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
    const { jadwalUmum, kelas, instruktur } = this.state;
    const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];
    const sesi = ["1", "2", "3", "4"];

    return (
      <div>
        <FaPencilAlt style={{ color: "green", cursor: "pointer" }} onClick={this.handleShowEditModal} />
        <Modal />
        <Modal show={this.state.showEditModal} onHide={this.handleHideEditModal}>
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>EDIT JADWAL UMUM</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formKelas">
                <Form.Label>Kelas</Form.Label>
                <Form.Control as="select" value={jadwalUmum.ID_KELAS} name="ID_KELAS" onChange={this.handleInputChange}>
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
                <Form.Control disabled as="select" value={jadwalUmum.ID_INSTRUKTUR} name="ID_INSTRUKTUR" onChange={this.handleInputChange}>
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
                <Form.Control as="select" value={jadwalUmum.HARI_JADWAL_UMUM} name="HARI_JADWAL_UMUM" onChange={this.handleInputChange}>
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
                <Form.Control as="select" value={jadwalUmum.SESI_JADWAL_UMUM} name="SESI_JADWAL_UMUM" onChange={this.handleInputChange}>
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
            <Button variant="secondary" onClick={this.handleHideEditModal}>
              Batal
            </Button>
            <Button variant="primary" onClick={() => this.handleEditJadwalUmum(jadwalUmum.ID_JADWAL_UMUM)}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
