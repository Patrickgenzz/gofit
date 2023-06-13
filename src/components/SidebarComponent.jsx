import React, { useState } from "react";
import "../style/sidebar.css";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { gantiPasswordAPI } from "../utils/Api";

const SidebarComponent = () => {
  const [isExpanded, setExpendState] = useState(false);

  const user = JSON.parse(localStorage.getItem("USER"));

  let menuItems = [
    {
      text: "Member",
      icon: "icons/member.svg",
      link: "/member",
      authorizedRoles: ["KASIR"],
    },
    {
      text: "Instruktur",
      icon: "icons/instruktur.svg",
      link: "/instruktur",
      authorizedRoles: ["ADMIN"],
    },
    {
      text: "Jadwal Umum",
      icon: "icons/jadwalUmum.svg",
      link: "/jadwalUmum",
      authorizedRoles: ["MO"],
    },
    {
      text: "Jadwal Harian",
      icon: "icons/jadwalHarian.svg",
      link: "/jadwalHarian",
      authorizedRoles: ["MO"],
    },
    {
      text: "Aktivasi",
      icon: "icons/aktivasi.svg",
      link: "/aktivasi",
      authorizedRoles: ["KASIR"],
    },
    {
      text: "Deposit Uang",
      icon: "icons/depositUang.svg",
      link: "/depositUang",
      authorizedRoles: ["KASIR"],
    },
    {
      text: "Deposit Kelas",
      icon: "icons/depositKelas.svg",
      link: "/depositKelas",
      authorizedRoles: ["KASIR"],
    },
    {
      text: "Ijin Instruktur",
      icon: "icons/ijinInstruktur.svg",
      link: "/ijinInstruktur",
      authorizedRoles: ["MO"],
    },
    {
      text: "Presensi Kelas",
      icon: "icons/presensi.svg",
      link: "/presensiKelas",
      authorizedRoles: ["KASIR"],
    },
    {
      text: "Presensi Gym",
      icon: "icons/presensi_gym.svg",
      link: "/presensiGym",
      authorizedRoles: ["KASIR"],
    },
    {
      text: "Laporan Pendapatan",
      icon: "icons/pendapatan.svg",
      link: "/laporanPendapatan",
      authorizedRoles: ["MO"],
    },
    {
      text: "Laporan Kelas",
      icon: "icons/presensi.svg",
      link: "/laporanKelas",
      authorizedRoles: ["MO"],
    },
    {
      text: "Laporan Gym",
      icon: "icons/presensi_gym.svg",
      link: "/laporanGym",
      authorizedRoles: ["MO"],
    },
    {
      text: "Laporan Kinerja",
      icon: "icons/kinerja.svg",
      link: "/laporanKinerja",
      authorizedRoles: ["MO"],
    },
  ];

  const logout = () => {
    Swal.fire({
      title: "Apakah Anda Yakin Ingin Keluar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("USER");
        Swal.fire({
          title: "Sukses!",
          text: "Berhasil Logout!",
          icon: "success",
          timer: 1000,
          showConfirmButton: false,
        });
        setTimeout(() => {
          window.location.href = "/";
        }, 1500);
      }
    });
  };

  const gantiPassword = () => {
    Swal.fire({
      title: "Ganti Password",
      html: `<input type="password" id="password-lama" class="swal2-input" placeholder="Password Lama">
      <input type="password" id="password-baru" class="swal2-input" placeholder="Password Baru">
      <input type="password" id="password-check" class="swal2-input" placeholder="Konfirmasi Password Baru">`,
      confirmButtonText: "Ganti Password",
      preConfirm: () => {
        const oldPassword = document.getElementById("password-lama").value;
        const newPassword = document.getElementById("password-baru").value;
        const checkPassword = document.getElementById("password-check").value;

        if (!checkPassword) {
          Swal.showValidationMessage("Konfirmasi Password Tidak Boleh Kosong!");
        } else if (newPassword !== checkPassword) {
          Swal.showValidationMessage("Password Baru Tidak Sama!");
        }

        if (!newPassword) {
          Swal.showValidationMessage("Password Baru Tidak Boleh Kosong!");
        }

        if (!oldPassword) {
          Swal.showValidationMessage("Password Lama Tidak Boleh Kosong!");
        }

        return { oldPassword, newPassword };
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          EMAIL: user.EMAIL,
          PASSWORD: result.value.oldPassword,
          NEW_PASSWORD: result.value.newPassword,
        };
        gantiPasswordAPI(data)
          .then((res) => {
            console.log(res);
            Swal.fire({
              title: "Sukses!",
              text: "Berhasil Ganti Password!",
              icon: "success",
              timer: 1000,
              showConfirmButton: false,
            });
          })
          .catch((err) => {
            console.log(err);
            Swal.fire({
              title: "Gagal!",
              text: "Password Lama Salah!",
              icon: "error",
              timer: 1000,
              showConfirmButton: false,
            });
          });
      }
    });
  };

  return (
    <div className={isExpanded ? "side-nav-container" : "side-nav-container side-nav-container-NX"}>
      <div className="nav-upper">
        <div className="nav-heading">
          {isExpanded && (
            <div className="nav-brand">
              <img src="icons/logo.svg" />
              <h2>
                <strong>GOFIT</strong>
              </h2>
            </div>
          )}
          <button className={isExpanded ? "hamburger hamburger-in" : "hamburger hamburger-out"} onClick={() => setExpendState(!isExpanded)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
        <div className="nav-menu">
          {menuItems
            .filter(({ authorizedRoles }) => user && authorizedRoles.includes(user.USER_TYPE))
            .map(({ text, icon, link, id }) => (
              <a key={id} className={isExpanded ? "menu-item" : "menu-item menu-item-NX"}>
                <Link to={link}>
                  <div style={{ display: "flex" }}>
                    <img
                      style={{
                        color: "var(--light)",
                        width: "58px",
                        padding: "0 12px",
                      }}
                      src={icon}
                    />
                    {isExpanded && (
                      <p
                        style={{
                          marginTop: "18px",
                          color: "white",
                          fontSize: "18px",
                        }}
                      >
                        {text}
                      </p>
                    )}
                  </div>
                </Link>
              </a>
            ))}
        </div>
      </div>
      <div className="nav-footer">
        {isExpanded && (
          <div className="nav-details">
            <img
              className="nav-footer-avatar"
              onClick={() => gantiPassword()}
              src={(() => {
                switch (user.USER_TYPE) {
                  case "ADMIN":
                    return "icons/admin-avatar.svg";
                  case "KASIR":
                    return "icons/kasir-avatar.svg";
                  case "MO":
                    return "icons/mo-avatar.svg";
                  default:
                    return "icons/user-avatar.svg";
                }
              })()}
            />
            <div className="nav-footer-info">
              <p className="nav-footer-user-name">{user.NAMA}</p>
              <p className="nav-footer-user-position">
                <strong>{user.USER_TYPE}</strong>
              </p>
            </div>
          </div>
        )}
        <img onClick={logout} className="logout-icon" src="icons/logout.svg" />
      </div>
    </div>
  );
};

export default SidebarComponent;
