import React, { Component } from "react";
import { SidebarComponent } from "../../../components";
import { FaPrint, FaSearch } from "react-icons/fa";
import { Button, Table, Row, Form } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import { getLaporanPendapatan, getFindLaporanPendapatan } from "../../../utils/Api";
import { formatMoney } from "../../../utils";
import ReactToPrint from "react-to-print";
import Swal from "sweetalert2";

export default class LaporanPendapatanPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listLaporan: [],
      tahun: "",
      tanggalCetak: new Date().toLocaleDateString("id-ID"),
    };
    this.componentRef = React.createRef();
  }

  componentDidMount() {
    getLaporanPendapatan()
      .then((result) => {
        this.setState({ listLaporan: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  renderTableRows() {
    const { listLaporan } = this.state;

    const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

    let sumTotal = 0;

    const tableRows = listLaporan.map((data, index) => {
      if (data.BULAN === "12") {
        sumTotal += parseInt(data.TOTAL);
        return (
          <tr key={index}>
            <td>{monthNames[parseInt(data.BULAN) - 1]}</td>
            <td>{data.JUMLAH_AKTIVASI !== "0" ? `Rp.${formatMoney(data.JUMLAH_AKTIVASI)}` : "..."}</td>
            <td>{data.JUMLAH_DEPOSIT !== "0" ? `Rp.${formatMoney(data.JUMLAH_DEPOSIT)}` : "..."}</td>
            <td>{data.TOTAL !== "0" ? `Rp.${formatMoney(data.TOTAL)}` : "..."}</td>
          </tr>
        );
      } else {
        sumTotal += parseInt(data.TOTAL);
        return (
          <tr key={index}>
            <td>{monthNames[parseInt(data.BULAN) - 1]}</td>
            <td>{data.JUMLAH_AKTIVASI !== "0" ? `Rp.${formatMoney(data.JUMLAH_AKTIVASI)}` : "..."}</td>
            <td>{data.JUMLAH_DEPOSIT !== "0" ? `Rp.${formatMoney(data.JUMLAH_DEPOSIT)}` : "..."}</td>
            <td>{data.TOTAL !== "0" ? `Rp.${formatMoney(data.TOTAL)}` : "..."}</td>
          </tr>
        );
      }
    });

    const formattedSumTotal = `Rp.${formatMoney(sumTotal)}`;

    return (
      <>
        {tableRows}
        <tr>
          <td></td>
          <td></td>
          <td style={{ textAlign: "right", fontWeight: "bold" }}>Total Keseluruhan :</td>
          <td>{formattedSumTotal}</td>
        </tr>
      </>
    );
  }

  handleInputChange = (event) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      tahun: {
        ...prevState.tahun,
        [name]: value,
      },
    }));
  };

  handleSearch = (tahun) => {
    getFindLaporanPendapatan(tahun)
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
    const { listLaporan, tahun } = this.state;

    const chartData = {
      options: {
        plotOptions: {
          bar: {
            horizontal: false,
            columnWidth: "55%",
            endingShape: "rounded",
          },
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          show: true,
          width: 2,
          colors: ["transparent"],
        },
        xaxis: {
          categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        },
        yaxis: {
          title: {
            text: "Rupiah (Rp)",
          },
        },
        fill: {
          opacity: 1,
        },
        tooltip: {
          y: {
            formatter: function (val) {
              return "Rp." + formatMoney(val);
            },
          },
        },
      },
      series: [
        {
          name: "Jumlah Aktivasi",
          data: listLaporan.map((data) => parseFloat(data.JUMLAH_AKTIVASI)),
        },
        {
          name: "Jumlah Deposit",
          data: listLaporan.map((data) => parseFloat(data.JUMLAH_DEPOSIT)),
        },
        {
          name: "Total",
          data: listLaporan.map((data) => parseFloat(data.TOTAL)),
        },
      ],
    };

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
              <h1 style={{ margin: "auto", marginRight: "15px" }}>LAPORAN PENDAPATAN</h1>
              <Form className="d-flex mt-2">
                <Form.Control
                  name="tahun"
                  onChange={this.handleInputChange}
                  type="search"
                  placeholder="Cari Tahun"
                  className="me-2"
                  aria-label="Search"
                />
                <div className="button-tambah">
                  <Button variant="outline-primary" onClick={() => this.handleSearch(tahun)}>
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
          <div ref={this.componentRef}>
            <Row>
              <Table striped bordered>
                <thead>
                  <tr>
                    <th colSpan="4" style={tableHeaderStyles}>
                      <div className="header-content">
                        <div style={titleStyles}>GoFit</div>
                        <div style={addressStyles}>Jl. Centralpark No. 10 Yogyakarta</div>
                        <br />
                        <div style={reportTitleStyles}>LAPORAN PENDAPATAN BULANAN</div>
                        <div style={periodStyles}>Periode: {tahun === "" ? "--" : tahun.tahun}</div>
                        <div style={printDateStyles}>Tanggal Cetak: {this.state.tanggalCetak}</div>
                      </div>
                    </th>
                  </tr>
                  <tr>
                    <th>Bulan</th>
                    <th>Jumlah Aktivasi</th>
                    <th>Jumlah Deposit</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>{this.renderTableRows()}</tbody>
              </Table>
            </Row>
            <br />
            <ReactApexChart options={chartData.options} series={chartData.series} type="bar" height={350} />
          </div>
        </section>
      </div>
    );
  }
}
