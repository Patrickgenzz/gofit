import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { getMember, addAktivasi } from "../../utils/Api";
import { FaPlusSquare } from "react-icons/fa";

export default class ModalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      member: [],
      data: {
        ID_MEMBER: "",
        JUMLAH_PEMBAYARAN: "",
      },
    };
  }

  componentDidMount() {
    getMember()
      .then((result) => {
        this.setState({ member: result });
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
        ID_MEMBER: "",
        JUMLAH_PEMBAYARAN: "",
      },
    });
  };

  dateCheck = (date) => {
    const dateGenerate = new Date(date);

    return dateGenerate;
  };

  handleSaveAktivasi = (event) => {
    event.preventDefault();
    const { ID_MEMBER, JUMLAH_PEMBAYARAN } = this.state.data;

    if (!ID_MEMBER) {
      Swal.fire("Peringatan", "Member Tidak Boleh Kosong!", "warning");
      return;
    }

    if (!JUMLAH_PEMBAYARAN) {
      Swal.fire("Peringatan", "Jumlah Pembayaran Tidak Boleh Kosong!", "warning");
      return;
    } else if (JUMLAH_PEMBAYARAN < 3000000) {
      Swal.fire("Peringatan", "Jumlah Pembayaran Minimal Rp. 3.000.000!", "warning");
      return;
    }

    const user = JSON.parse(localStorage.getItem("USER"));
    const ID_PEGAWAI = user.ID;

    const data = {
      ID_MEMBER: ID_MEMBER,
      ID_PEGAWAI: ID_PEGAWAI,
      JUMLAH_PEMBAYARAN: JUMLAH_PEMBAYARAN,
    };

    addAktivasi(data)
      .then((result) => {
        this.handleHideAddModal();
        this.props.onAddAktivasi(result); //mengoper data ke parent
        this.componentDidMount();
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Gagal", "Gagal Menambah Aktivasi!", "error");
      });
  };

  render() {
    const { member, data } = this.state;
    const date = new Date();

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
              <strong>TAMBAH AKTIVASI</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formMember">
                <Form.Label>Member</Form.Label>
                <Form.Control as="select" value={data.ID_MEMBER} name="ID_MEMBER" onChange={this.handleInputChange}>
                  <option value="">Pilih Member</option>
                  {member.map((member) => (
                    <option key={member.id} value={member.ID_MEMBER} disabled={date < this.dateCheck(member.TANGGAL_KADALUARSA)}>
                      {member.NAMA_MEMBER}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPembayaran">
                <Form.Label>Jumlah Pembayaran</Form.Label>
                <Form.Control name="JUMLAH_PEMBAYARAN" onChange={this.handleInputChange} type="text" placeholder="Jumlah Pembayaran" required />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleHideAddModal}>
              Tutup
            </Button>
            <Button variant="primary" onClick={this.handleSaveAktivasi}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
