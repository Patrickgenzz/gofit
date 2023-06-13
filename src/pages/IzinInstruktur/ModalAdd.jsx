import React, { Component } from "react";
import { Button, Modal, Row, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { FaPlusSquare } from "react-icons/fa";
import { konfirmasiIzinInstruktur } from "../../utils/Api";
import { formatDateTime } from "../../utils";

export default class ModalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      listIzinInstruktur: props.listIzinInstruktur,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listIzinInstruktur !== this.props.listIzinInstruktur) {
      this.setState({
        listIzinInstruktur: this.props.listIzinInstruktur,
      });
    }
  }

  handleShowEditModal = () => {
    this.setState({ showEditModal: true });
  };

  handleHideEditModal = () => {
    this.setState({
      showEditModal: false,
    });
  };

  handleKonfirmasi(id, tanggal) {
    Swal.fire({
      title: "Apakah Anda Yakin?",
      text: "Ingin Mengkonfirmasi Izin!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Ya, Konfirmasi!",
    }).then((result) => {
      if (result.isConfirmed) {
        konfirmasiIzinInstruktur(id, tanggal)
          .then((result) => {
            this.handleHideEditModal();
            this.props.onUpdateIzinInstruktur(result); //mengoper data ke parent
            Swal.fire("Berhasil!", "Berhasil Mengkonfirmasi Izin!", "success");
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Gagal!", "Gagal Mengkonfirmasi Izin!", "error");
          });
      }
    });
  }

  render() {
    const { listIzinInstruktur } = this.state;
    return (
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
        }}
        className="button-tambah"
      >
        <Button color="purple darken-4" dark onClick={this.handleShowEditModal}>
          <FaPlusSquare style={{ marginRight: "10px" }}></FaPlusSquare>
          Konfirmasi Izin
        </Button>
        <Modal />
        <Modal show={this.state.showEditModal} onHide={this.handleHideEditModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>LIST IZIN</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nama</th>
                    <th>Instruktur Pengganti</th>
                    <th>Izin Pada Tanggal</th>
                    <th>Alasan Izin</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {listIzinInstruktur
                    .filter((izin) => izin.STATUS_KONFIRMASI_IZIN !== "Dikonfirmasi")
                    .map((izin, id) => (
                      <tr key={id}>
                        <td>{izin.ID_IZIN_INSTRUKTUR}</td>
                        <td>{izin.NAMA_INSTRUKTUR}</td>
                        <td>{izin.INSTRUKTUR_PENGGANTI}</td>
                        <td>{formatDateTime(izin.TANGGAL_IZIN)}</td>
                        <td>{izin.ALASAN_IZIN}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <Button variant={"primary"} dark onClick={() => this.handleKonfirmasi(izin.ID_IZIN_INSTRUKTUR, izin.TANGGAL_IZIN)}>
                              Konfirmasi
                            </Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </Table>
            </Row>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleHideEditModal}>
              Batal
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
