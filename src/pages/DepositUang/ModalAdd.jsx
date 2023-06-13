import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { getMember, addDepositUang } from "../../utils/Api";
import { FaPlusSquare } from "react-icons/fa";

export default class ModalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      member: [],
      data: {
        ID_MEMBER: "",
        JUMLAH_DEPOSIT_UANG: "",
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
        JUMLAH_DEPOSIT_UANG: "",
      },
    });
  };

  handleSaveDepositUang = (event) => {
    event.preventDefault();
    const { ID_MEMBER, JUMLAH_DEPOSIT_UANG } = this.state.data;

    if (!ID_MEMBER) {
      Swal.fire("Peringatan", "Member Tidak Boleh Kosong!", "warning");
      return;
    }

    if (!JUMLAH_DEPOSIT_UANG) {
      Swal.fire("Peringatan", "Jumlah Deposit Tidak Boleh Kosong!", "warning");
      return;
    } else if (JUMLAH_DEPOSIT_UANG < 500000) {
      Swal.fire("Peringatan", "Jumlah Deposit Minimal Rp. 500.000!", "warning");
      return;
    }

    const user = JSON.parse(localStorage.getItem("USER"));
    const ID_PEGAWAI = user.ID;

    const data = {
      ID_MEMBER: ID_MEMBER,
      JUMLAH_DEPOSIT_UANG: JUMLAH_DEPOSIT_UANG,
      ID_PEGAWAI: ID_PEGAWAI,
    };

    addDepositUang(data)
      .then((result) => {
        this.handleHideAddModal();
        this.props.onAddDepositUang(result); //mengoper data ke parent
        this.componentDidMount();
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Gagal", "Gagal Menambah Deposit Uang!", "error");
      });
  };

  render() {
    const { member, data } = this.state;

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
              <strong>TAMBAH DEPOSIT UANG</strong>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="formMember">
                <Form.Label>Member</Form.Label>
                <Form.Control as="select" value={data.ID_MEMBER} name="ID_MEMBER" onChange={this.handleInputChange}>
                  <option value="">Pilih Member</option>
                  {member.map((member) => (
                    <option key={member.id} value={member.ID_MEMBER}>
                      {member.NAMA_MEMBER}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDeposit">
                <Form.Label>Jumlah Deposit</Form.Label>
                <Form.Control name="JUMLAH_DEPOSIT_UANG" onChange={this.handleInputChange} type="text" placeholder="Jumlah Deposit" required />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleHideAddModal}>
              Tutup
            </Button>
            <Button variant="primary" onClick={this.handleSaveDepositUang}>
              Simpan
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
