import React, { Component } from "react";
import { FaPrint } from "react-icons/fa";
import { formatMoney } from "../../utils";

class CetakAktivasi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      aktivasi: props.aktivasi,
      isVisible: false,
    };
    this.canvasRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.aktivasi !== this.props.aktivasi) {
      this.setState({
        aktivasi: this.props.aktivasi,
      });
    } else {
      this.displayAktivasi();
    }
  }

  displayAktivasi = () => {
    const canvas = this.canvasRef.current;
    canvas.width = 903;
    canvas.height = 270;
    const ctx = canvas.getContext("2d");

    // Set the background color and style
    ctx.fillStyle = "#F7F7F7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#000000";
    ctx.fillRect(10, 10, canvas.width - 20, 50);

    ctx.font = "30px Arial";
    ctx.fillStyle = "#FFFFFF";
    ctx.fillText("GOFIT", 25, 45);
    ctx.font = "50px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Transaksi Aktivasi", 25, 140);
    ctx.font = "18px Courier New";
    ctx.fillText("MEMBER            : " + this.state.aktivasi.ID_MEMBER + "/" + this.state.aktivasi.NAMA_MEMBER, 25, 200);
    ctx.fillText("AKTIVASI TAHUNAN  : " + "Rp." + formatMoney(this.state.aktivasi.JUMLAH_PEMBAYARAN), 25, 220);
    ctx.fillText("MASA AKTIF MEMBER : " + this.state.aktivasi.MASA_BERLAKU_AKTIVASI, 25, 240);
    ctx.fillText("NO STRUK : " + this.state.aktivasi.ID_AKTIVASI, 525, 200);
    ctx.fillText("TANGGAL  : " + this.state.aktivasi.TANGGAL_AKTIVASI, 525, 220);
    ctx.fillText("KASIR    : " + this.state.aktivasi.ID_PEGAWAI + "/" + this.state.aktivasi.NAMA_PEGAWAI, 525, 240);
  };

  handlePrint = () => {
    const canvas = this.canvasRef.current;
    const dataURL = canvas.toDataURL("image/jpg");
    const nama = this.state.aktivasi.NAMA_MEMBER;

    const link = document.createElement("a");
    link.download = "AK_" + nama + ".jpg";
    link.href = dataURL;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  render() {
    const { isVisible } = this.state;
    return (
      <>
        <FaPrint onClick={this.handlePrint} style={{ marginTop: "4px", marginLeft: "10px", color: "blue", cursor: "pointer" }} />
        <div style={{ display: isVisible ? "block" : "none" }}>
          <canvas ref={this.canvasRef} />
        </div>
      </>
    );
  }
}

export default CetakAktivasi;
