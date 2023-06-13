import React, { Component } from "react";
import { getListBookingGym } from "../../../utils/Api";
import { formatDateTime } from "../../../utils";
import { SidebarComponent } from "../../../components";
import { Row, Table } from "react-bootstrap";
import CetakBookingGym from "./CetakBookingGym";
import ModalAdd from "./ModalAdd";

export default class PresensiGymPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listBookingGym: [],
    };
  }

  componentDidMount() {
    getListBookingGym()
      .then((result) => {
        this.setState({ listBookingGym: result });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  updatedPresensi = (result) => {
    const newList = [...this.state.listBookingGym];
    const index = newList.findIndex((gym) => gym.ID_BOOKING_GYM === result.ID_BOOKING_GYM);
    newList[index] = result;
    this.setState({ listBookingGym: newList });
  };

  render() {
    const { listBookingGym } = this.state;
    return (
      <div style={{ display: "flex" }}>
        <SidebarComponent />
        <section className="home-section">
          <div style={{ display: "flex", marginTop: "18px" }}>
            <div style={{ display: "flex" }}>
              <h1 style={{ margin: "auto", marginRight: "15px" }}>PRESENSI GYM</h1>
            </div>
            <ModalAdd listBookingGym={listBookingGym} onUpdatePresensi={this.updatedPresensi} />
          </div>
          <hr />
          <Row>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Member</th>
                  <th>Tanggal Booking</th>
                  <th>Status</th>
                  <th>Waktu Presensi</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {listBookingGym
                  .filter((gym) => gym.STATUS === "Hadir")
                  .map((gym, id) => (
                    <tr key={id}>
                      <td>{gym.ID_BOOKING_GYM}</td>
                      <td>{gym.NAMA_MEMBER}</td>
                      <td>{formatDateTime(gym.TANGGAL_DIBOOKING_GYM)}</td>
                      <td>{gym.STATUS}</td>
                      <td>{gym.WAKTU_PRESENSI_GYM ? formatDateTime(gym.WAKTU_PRESENSI_GYM) : "-"}</td>
                      <td>
                        <div style={{ display: "flex", alignItems: "center" }}>
                          <CetakBookingGym gym={gym} />
                        </div>
                      </td>
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
