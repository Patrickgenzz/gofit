import React, { Component } from "react";
import { FaPrint } from "react-icons/fa";

class CetakMemberCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      member: props.member,
      isVisible: false,
    };
    this.canvasRef = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.member !== this.props.member) {
      this.setState({
        member: this.props.member,
      });
    } else {
      this.displayMemberCard();
    }
  }

  displayMemberCard = () => {
    var background = new Image();
    background.src = "../gofit.jpg";
    background.onload = () => {
      const canvas = this.canvasRef.current;
      canvas.width = 428;
      canvas.height = 270;
      const ctx = canvas.getContext("2d");
      ctx.globalCompositeOperation = "darken";
      ctx.drawImage(background, 0, 0);
      ctx.font = "50px Roboto";
      ctx.fillText(
        this.state.member.NAMA_MEMBER.length > 15 ? this.state.member.NAMA_MEMBER.substring(0, 12) + "..." : this.state.member.NAMA_MEMBER,
        25,
        140
      );
      ctx.font = "18px Courier New";
      ctx.fillText(" " + this.state.member.ID_MEMBER, 25, 182);
      ctx.fillText(
        " " +
          (this.state.member.ALAMAT_MEMBER.length > 23 ? this.state.member.ALAMAT_MEMBER.substring(0, 21) + "..." : this.state.member.ALAMAT_MEMBER),
        25,
        205
      );
      ctx.fillText(" " + this.state.member.NO_TELEPON_MEMBER, 25, 228);
      ctx.fillText(" " + this.state.member.EMAIL, 25, 250);
    };
  };

  handlePrint = () => {
    const canvas = this.canvasRef.current;
    const dataURL = canvas.toDataURL("image/jpg");
    const nama = this.state.member.NAMA_MEMBER;

    const link = document.createElement("a");
    link.download = nama + ".jpg";
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

export default CetakMemberCard;
