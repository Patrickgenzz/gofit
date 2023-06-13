import React, { Component } from "react";
import { IonIcon } from "@ionic/react";
import { mailOutline, lockClosedOutline } from "ionicons/icons";
import "../style/login.css";
import { Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { login } from "../utils/Api";

export default class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        EMAIL: "",
        PASSWORD: "",
      },
    };
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

  handleLogin = (event) => {
    event.preventDefault();

    const { EMAIL, PASSWORD } = this.state.data;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validasi
    if (!EMAIL) {
      Swal.fire("Error", "Email Tidak Boleh Kosong!", "warning");
      return;
    } else if (!emailRegex.test(EMAIL)) {
      Swal.fire("Error", "Email Tidak Valid!", "warning");
      return;
    }

    if (!PASSWORD) {
      Swal.fire("Error", "Password Tidak Boleh Kosong!", "warning");
      return;
    }

    // Kirim ke API
    login(this.state.data)
      .then((result) => {
        localStorage.setItem("USER", JSON.stringify(result));
        Swal.fire({
          title: "Sukses!",
          text: "Berhasil Login!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });

        if (result.USER_TYPE === "ADMIN") {
          setTimeout(() => {
            window.location.href = "/instruktur";
          }, 1500);
        } else if (result.USER_TYPE === "KASIR") {
          setTimeout(() => {
            window.location.href = "/member";
          }, 1500);
        } else if (result.USER_TYPE === "MO") {
          setTimeout(() => {
            window.location.href = "/jadwalUmum";
          }, 1500);
        }
      })
      .catch((error) => {
        console.error(error);
        Swal.fire("Gagal!", "Email Atau Password Salah!", "error");
      });
  };

  render() {
    return (
      <div className="container">
        <div className="stars">
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
          <div className="star"></div>
        </div>
        <div className="form-box">
          <div className="form-value">
            <Form>
              <h2>GOFIT</h2>
              <div className="inputbox">
                <IonIcon icon={mailOutline} />
                <input name="EMAIL" onChange={this.handleInputChange} type="text" autocomplete="off"></input>
                <label>Email</label>
              </div>
              <div className="inputbox">
                <IonIcon icon={lockClosedOutline} />
                <input name="PASSWORD" onChange={this.handleInputChange} type="password"></input>
                <label>Password</label>
              </div>
              <button onClick={this.handleLogin}>Login</button>
            </Form>
          </div>
        </div>
      </div>
    );
  }
}
