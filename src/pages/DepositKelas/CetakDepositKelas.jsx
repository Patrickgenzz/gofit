import React, { Component } from "react";
import { FaPrint } from "react-icons/fa";

export default class CetakDepositKelas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      depositKelas: props.depositKelas,
      isVisible: false,
    };
    this.canvasRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.depositKelas !== this.props.depositKelas) {
      this.setState({
        depositKelas: this.props.depositKelas,
      });
    } else {
      this.displayDepositKelas();
    }
  }

  displayDepositKelas = () => {
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
    ctx.font = "40px Arial";
    ctx.fillStyle = "#000000";
    ctx.fillText("Transaksi Deposit Kelas ", 25, 120);
    ctx.font = "18px Courier New";
    ctx.fillText("MEMBER                : " + this.state.depositKelas.ID_MEMBER + "/" + this.state.depositKelas.NAMA_MEMBER, 25, 165);
    ctx.fillText(
      this.state.depositKelas.JUMLAH_DEPOSIT_KELAS === 5
        ? "Deposit (5 Gratis 1)  : Rp.750.000(5 x Rp.150.000)"
        : "Deposit (10 Gratis 3) : Rp.1.500.000(10 x Rp.150.000)",
      25,
      185
    );
    ctx.fillText("JENIS KELAS           : " + this.state.depositKelas.JENIS_KELAS, 25, 205);
    ctx.fillText("TOTAL DEPOSIT " + this.state.depositKelas.JENIS_KELAS + " : " + this.state.depositKelas.TOTAL_DEPOSIT_KELAS, 25, 225);
    ctx.fillText("BERLAKU SAMPAI        : " + this.state.depositKelas.MASA_BERLAKU_DEPOSIT_KELAS, 25, 245);

    ctx.fillText("NO STRUK : " + this.state.depositKelas.ID_DEPOSIT_KELAS, 505, 90);
    ctx.fillText("TANGGAL  : " + this.state.depositKelas.TANGGAL_DEPOSIT_KELAS, 505, 110);
    ctx.fillText("KASIR    : " + this.state.depositKelas.ID_PEGAWAI + "/" + this.state.depositKelas.NAMA_PEGAWAI, 505, 130);
  };

  handlePrint = () => {
    const canvas = this.canvasRef.current;
    const dataURL = canvas.toDataURL("image/jpg");
    const nama = this.state.depositKelas.NAMA_MEMBER;

    const link = document.createElement("a");
    link.download = "DK_" + nama + ".jpg";
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
