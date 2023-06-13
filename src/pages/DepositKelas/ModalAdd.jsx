import React, { Component } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { formatMoney } from "../../utils";
import { getMember, getKelas, getPromo, addDepositKelas } from "../../utils/Api";
import { FaPlusSquare } from "react-icons/fa";

export default class ModalAdd extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAddModal: false,
      member: [],
      kelas: [],
      promo: [],
      data: {
        ID_MEMBER: "",
        ID_KELAS: "",
        JUMLAH_DEPOSIT_KELAS: "",
        JUMLAH_PEMBAYARAN: "",
      },
      totalPembayaran: 0,
      diskon: "",
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

    getKelas()
      .then((result) => {
        this.setState({ kelas: result });
      })
      .catch((error) => {
        console.error(error);
      });

    getPromo()
      .then((result) => {
        this.setState({ promo: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;

    this.setState(
      (prevState) => ({
        data: {
          ...prevState.data,
          [name]: value,
        },
      }),
      () => {
        this.showPembayaran();
      }
    );
  };

  handleShowAddModal = () => {
    this.setState({ showAddModal: true });
  };

  handleHideAddModal = () => {
    this.setState({
      showAddModal: false,
      data: {
        ID_MEMBER: "",
        ID_KELAS: "",
        JUMLAH_DEPOSIT_KELAS: "",
        JUMLAH_PEMBAYARAN: "",
      },
    });
  };

  showPembayaran = () => {
    const { data, kelas, promo } = this.state;

    const selectedKelas = kelas.find((kelas) => kelas.ID_KELAS === data.ID_KELAS);

    if (!selectedKelas) {
      return;
    }

    const diskon = promo.reduce((maxPromo, currentPromo) => {
      if (
        currentPromo.MINIMAL_PEMBELIAN <= data.JUMLAH_DEPOSIT_KELAS &&
        currentPromo.JENIS_PROMO === "Kelas" &&
        (!maxPromo || currentPromo.MINIMAL_PEMBELIAN > maxPromo.MINIMAL_PEMBELIAN)
      ) {
        return currentPromo;
      }
      return maxPromo;
    }, null);

    if (!diskon) {
      const bonus = "Tidak Ada Bonus";
      this.setState({ diskon: bonus });
    } else {
      if (data.JUMLAH_DEPOSIT_KELAS < 5) {
        const bonus = "Tidak Ada Bonus";
        this.setState({ diskon: bonus });
      } else {
        const bonus = "Beli " + diskon.MINIMAL_PEMBELIAN + " Gratis " + diskon.BONUS;
        this.setState({ diskon: bonus });
      }
    }

    const total = selectedKelas.TARIF_KELAS * data.JUMLAH_DEPOSIT_KELAS;
    this.setState({ totalPembayaran: total });
    return;
  };

  handleSaveDepositKelas = (event) => {
    event.preventDefault();

    const { ID_MEMBER, ID_KELAS, JUMLAH_DEPOSIT_KELAS, JUMLAH_PEMBAYARAN } = this.state.data;

    if (!ID_MEMBER) {
      Swal.fire("Peringatan", "Member Tidak Boleh Kosong!", "warning");
      return;
    }

    if (!ID_KELAS) {
      Swal.fire("Peringatan", "Kelas Tidak Boleh Kosong!", "warning");
      return;
    }

    if (!JUMLAH_DEPOSIT_KELAS) {
      Swal.fire("Peringatan", "Jumlah Deposit Tidak Boleh Kosong!", "warning");
      return;
    }

    if (!JUMLAH_PEMBAYARAN) {
      Swal.fire("Peringatan", "Jumlah Pembayaran Tidak Boleh Kosong!", "warning");
      return;
    } else if (JUMLAH_PEMBAYARAN < this.state.totalPembayaran) {
      Swal.fire("Peringatan", "Jumlah Pembayaran Tidak Boleh Kurang Dari Total Pembayaran!", "warning");
      return;
    }

    const user = JSON.parse(localStorage.getItem("USER"));
    const ID_PEGAWAI = user.ID;

    const data = {
      ID_MEMBER: ID_MEMBER,
      ID_KELAS: ID_KELAS,
      ID_PEGAWAI: ID_PEGAWAI,
      JUMLAH_DEPOSIT_KELAS: JUMLAH_DEPOSIT_KELAS,
      JUMLAH_PEMBAYARAN: JUMLAH_PEMBAYARAN,
    };

    addDepositKelas(data)
      .then((result) => {
        this.handleHideAddModal();
        this.props.onAddDepositKelas(result); //mengoper data ke parent
        this.componentDidMount();
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Gagal", "Gagal Menambah Deposit Kelas!", "error");
      });
  };

  render() {
    const { member, kelas, data, totalPembayaran, diskon } = this.state;

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
              <strong>TAMBAH DEPOSIT KELAS</strong>
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
              <Form.Group className="mb-3" controlId="formBasicDeposit">
                <Form.Label>Jumlah Deposit Kelas</Form.Label>

                <Form.Select
                  name="JUMLAH_DEPOSIT_KELAS"
                  onChange={(event) => {
                    this.handleInputChange(event);
                  }}
                  className="me-2"
                >
                  <option value="">Pilih Deposit Kelas</option>
                  <option value="5">5</option>
                  <option value="10">10</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPromo">
                <Form.Label>Promo</Form.Label>
                <Form.Control disabled type="text" placeholder={diskon === "" ? "Pilih Kelas Dan Jumlah Deposit" : diskon} />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicDeposit">
                <Form.Label>Jumlah Pembayaran</Form.Label>
                <Form.Control
                  name="JUMLAH_PEMBAYARAN"
                  onChange={this.handleInputChange}
                  type="text"
                  placeholder={totalPembayaran === 0 ? "Jumlah Pembayaran" : "Rp." + formatMoney(totalPembayaran)}
                  required
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleHideAddModal}>
              Tutup
            </Button>
            <Button variant="primary" onClick={this.handleSaveDepositKelas}>
              Tambah
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}
