import React, { Component } from "react";
import { SidebarComponent } from "../../../components";
import { FaPrint, FaSearch } from "react-icons/fa";
import { Button, Row, Table, Form } from "react-bootstrap";
import { getLaporanKinerja, getFindLaporanKinerja } from "../../../utils/Api";
import ReactToPrint from "react-to-print";
import Swal from "sweetalert2";

export default class LaporanKinerjaPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listLaporan: [],
      bulan: "",
      tahun: "",
      tanggalCetak: new Date().toLocaleDateString("id-ID"),
    };
    this.componentRef = React.createRef();
  }

  componentDidMount() {
    getLaporanKinerja()
      .then((result) => {
        this.setState({ listLaporan: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  handleInputTahun = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      tahun: {
        ...prevState.tahun,
        [name]: value,
      },
    }));
  };

  handleInputBulan = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      bulan: {
        ...prevState.bulan,
        [name]: value,
      },
    }));
  };

  handleSearch = (tahun, bulan) => {
    getFindLaporanKinerja(tahun, bulan)
      .then((result) => {
        Swal.fire("Sukses!", "Data Ditemukan!", "success");
        this.setState({ listLaporan: result });
      })
      .catch((error) => {
        Swal.fire("Peringatan!", "Data Tidak Ditemukan!", "warning");
        console.error(error);
        this.componentDidMount();
      });
  };

  render() {
    const { listLaporan, tahun, bulan } = this.state;

    const tableHeaderStyles = {
      backgroundColor: "rgba(0, 149, 255, 0.23)",
      padding: "20px",
      textAlign: "center",
    };

    const titleStyles = {
      fontSize: "24px",
      fontWeight: "bold",
    };

    const addressStyles = {
      fontSize: "16px",
      marginBottom: "10px",
    };

    const reportTitleStyles = {
      fontSize: "20px",
      fontWeight: "bold",
      marginBottom: "10px",
    };

    const periodStyles = {
      marginBottom: "10px",
    };

    const printDateStyles = {
      fontStyle: "italic",
    };

    return (
      <div style={{ display: "flex" }}>
        <SidebarComponent />
        <section className="home-section">
          <div style={{ display: "flex", marginTop: "18px" }}>
            <div style={{ display: "flex" }}>
              <h1 style={{ margin: "auto", marginRight: "15px" }}>LAPORAN KINERJA</h1>
              <Form className="d-flex mt-2">
                <Form.Control
                  name="tahun"
                  onChange={this.handleInputTahun}
                  type="search"
                  placeholder="Cari Tahun"
                  className="me-2"
                  aria-label="Search"
                />
                <Form.Select name="bulan" onChange={this.handleInputBulan} className="me-2" aria-label="Pilih Bulan">
                  <option value="">Pilih Bulan</option>
                  <option value="1">Januari</option>
                  <option value="2">Februari</option>
                  <option value="3">Maret</option>
                  <option value="4">April</option>
                  <option value="5">Mei</option>
                  <option value="6">Juni</option>
                  <option value="7">Juli</option>
                  <option value="8">Agustus</option>
                  <option value="9">September</option>
                  <option value="10">Oktober</option>
                  <option value="11">November</option>
                  <option value="12">Desember</option>
                </Form.Select>
                <div className="button-tambah">
                  <Button variant="outline-primary" onClick={() => this.handleSearch(tahun, bulan)}>
                    <FaSearch />
                  </Button>
                </div>
              </Form>
            </div>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                alignItems: "center",
              }}
              className="button-tambah"
            >
              <ReactToPrint
                trigger={() => (
                  <Button color="purple darken-4" dark>
                    <FaPrint style={{ marginRight: "10px" }}></FaPrint>
                    Export
                  </Button>
                )}
                content={() => this.componentRef.current}
              />
            </div>
          </div>
          <hr />
          <Row>
            <Table striped bordered ref={this.componentRef}>
              <thead>
                <tr>
                  <th colSpan="4" style={tableHeaderStyles}>
                    <div className="header-content">
                      <div style={titleStyles}>GoFit</div>
                      <div style={addressStyles}>Jl. Centralpark No. 10 Yogyakarta</div>
                      <br />
                      <div style={reportTitleStyles}>LAPORAN KINERJA INSTRUKTUR BULANAN</div>
                      <div style={periodStyles}>
                        Bulan: {bulan === "" ? "--" : bulan.bulan} Tahun: {tahun === "" ? "--" : tahun.tahun}
                      </div>
                      <div style={printDateStyles}>Tanggal Cetak: {this.state.tanggalCetak}</div>
                    </div>
                  </th>
                </tr>
                <tr>
                  <th>Nama</th>
                  <th>Jumlah Hadir</th>
                  <th>Jumlah Libur</th>
                  <th>Waktu Terlambat (Detik)</th>
                </tr>
              </thead>
              <tbody>
                {listLaporan.map((data, id) => (
                  <tr key={id}>
                    <td>{data.NAMA_INSTRUKTUR}</td>
                    <td>{data.JUMLAH_HADIR}</td>
                    <td>{data.JUMLAH_LIBUR}</td>
                    <td>{data.JUMLAH_TERLAMBAT}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Row>
        </section>
      </div>
    );
  }
}
