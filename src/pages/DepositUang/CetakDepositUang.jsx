import React, { Component } from "react";
import { FaPrint } from "react-icons/fa";

export default class CetakDepositUang extends Component {
  constructor(props) {
    super(props);
    this.state = {
      depositUang: props.depositUang,
      isVisible: false,
    };
    this.canvasRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.depositUang !== this.props.depositUang) {
      this.setState({
        depositUang: this.props.depositUang,
      });
    } else {
      this.displayDepositUang();
    }
  }

  displayDepositUang = () => {
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
    ctx.fillText("Transaksi Deposit Uang", 25, 140);
    ctx.font = "18px Courier New";
    ctx.fillText("ID DEPOSIT UANG : " + this.state.depositUang.ID_DEPOSIT_UANG, 495, 200);
    ctx.fillText("TANGGAL DEPOSIT : " + this.state.depositUang.TANGGAL_DEPOSIT_UANG, 495, 220);
    ctx.fillText("MEMBER        : " + this.state.depositUang.NAMA_MEMBER, 25, 200);
    ctx.fillText("JUMLAH        : " + this.state.depositUang.JUMLAH_DEPOSIT_UANG, 25, 220);
    ctx.fillText("TOTAL DEPOSIT : " + this.state.depositUang.TOTAL_DEPOSIT_UANG, 25, 240);
    ctx.fillText("KASIR           : " + this.state.depositUang.NAMA_PEGAWAI, 495, 240);
  };

  handlePrint = () => {
    const canvas = this.canvasRef.current;
    const dataURL = canvas.toDataURL("image/jpg");
    const nama = this.state.depositUang.NAMA_MEMBER;

    const link = document.createElement("a");
    link.download = "DU_" + nama + ".jpg";
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
