import React, { Component } from "react";
import { FaPrint } from "react-icons/fa";

export default class CetakKelasPaket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      kelas: props.kelas,
      isVisible: false,
    };
    this.canvasRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.kelas !== this.props.kelas) {
      this.setState({
        kelas: this.props.kelas,
      });
    } else {
      this.displayKelas();
    }
  }

  displayKelas = () => {
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
    ctx.fillText("STRUK PRESENSI KELAS PAKET", 25, 120);
    ctx.font = "18px Courier New";
    ctx.fillText("MEMBER         : " + this.state.kelas.ID_MEMBER + " / " + this.state.kelas.NAMA_MEMBER, 25, 180);
    ctx.fillText("NO STRUK       : " + this.state.kelas.ID_BOOKING_KELAS, 512, 200);
    ctx.fillText("TANGGAL        : " + this.state.kelas.TANGGAL_DIBOOKING_KELAS, 512, 220);
    ctx.fillText("KELAS          : " + this.state.kelas.JENIS_KELAS, 25, 220);
    ctx.fillText("INSTRUKTUR     : " + this.state.kelas.NAMA_INSTRUKTUR, 25, 200);
    ctx.fillText("SISA DEPOSIT   : " + this.state.kelas.SISA_DEPOSIT_KELAS + "x", 512, 240);
    ctx.fillText("BERLAKU SAMPAI : " + this.state.kelas.MASA_BERLAKU_DEPOSIT_KELAS, 25, 240);
  };

  handlePrint = () => {
    const canvas = this.canvasRef.current;
    const dataURL = canvas.toDataURL("image/jpg");
    const nama = this.state.kelas.NAMA_MEMBER;

    const link = document.createElement("a");
    link.download = "PAKET_" + nama + ".jpg";
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
