import React from "react";

class Score extends React.Component {
  render() {
    return <p className="score">Score: {this.props.score}</p>;
  }
}

export default Score;
