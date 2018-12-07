import React from "react";
import Score from "./Score";
import Timer from "./Timer";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <Score score={this.props.score} />
        <button className="button button--reset" onClick={this.props.resetGame}>
          Reset
        </button>
        <Timer />
      </div>
    );
  }
}

export default Header;
