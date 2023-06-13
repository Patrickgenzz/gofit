import React, { Component } from "react";
import { FaPrint } from "react-icons/fa";
import { formatDateToHour } from "../../../utils";

export default class CetakBookingGym extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gym: props.gym,
      isVisible: false,
    };
    this.canvasRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.gym !== this.props.gym) {
      this.setState({
        gym: this.props.gym,
      });
    } else {
      this.displayGym();
    }
  }

  displayGym = () => {
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
    ctx.fillText("STRUK PRESENSI GYM", 25, 150);
    ctx.font = "18px Courier New";
    ctx.fillText("MEMBER         : " + this.state.gym.ID_MEMBER + " / " + this.state.gym.NAMA_MEMBER, 25, 200);
    ctx.fillText("SLOT WAKTU     : " + formatDateToHour(this.state.gym.TANGGAL_DIBOOKING_GYM), 25, 220);
    ctx.fillText("NO STRUK       : " + this.state.gym.ID_BOOKING_GYM, 25, 240);
    ctx.fillText("TANGGAL        : " + this.state.gym.TANGGAL_DIBOOKING_GYM, 25, 260);
  };

  handlePrint = () => {
    const canvas = this.canvasRef.current;
    const dataURL = canvas.toDataURL("image/jpg");
    const nama = this.state.gym.NAMA_MEMBER;

    const link = document.createElement("a");
    link.download = "GYM_" + nama + ".jpg";
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
