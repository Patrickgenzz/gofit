import React, { Component } from "react";
import { Button, Modal, Row, Table } from "react-bootstrap";
import Swal from "sweetalert2";
import { konfirmasiBookingGym } from "../../../utils/Api";
import { FaPlusSquare } from "react-icons/fa";
import { formatDateTime } from "../../../utils";

export default class ModalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showEditModal: false,
      listBookingGym: props.listBookingGym,
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.listBookingGym !== this.props.listBookingGym) {
      this.setState({
        listBookingGym: this.props.listBookingGym,
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

  handleKonfirmasi(id) {
    konfirmasiBookingGym(id)
      .then((result) => {
        this.handleHideEditModal();
        this.props.onUpdatePresensi(result); //mengoper data ke parent
        Swal.fire("Sukses!", "Berhasil Presensi Member!", "success");
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Gagal!", "Gagal Presensi Member!", "error");
      });
  }

  render() {
    const { listBookingGym } = this.state;
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
          Presensi
        </Button>
        <Modal />
        <Modal show={this.state.showEditModal} onHide={this.handleHideEditModal} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              <strong>LIST PRESENSI</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Member</th>
                    <th>Tanggal Booking</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {listBookingGym
                    .filter((gym) => gym.STATUS !== "Hadir")
                    .map((gym, id) => (
                      <tr key={id}>
                        <td>{gym.ID_BOOKING_GYM}</td>
                        <td>{gym.NAMA_MEMBER}</td>
                        <td>{formatDateTime(gym.TANGGAL_DIBOOKING_GYM)}</td>
                        <td>
                          <div style={{ display: "flex", alignItems: "center" }}>
                            <Button variant={"primary"} dark onClick={() => this.handleKonfirmasi(gym.ID_BOOKING_GYM)}>
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
