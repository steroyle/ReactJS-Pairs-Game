import React, { Component } from "react";

class Card extends Component {
  handleClick = () => {
    this.props.cardSelected(this.props.index);
  };
  render() {
    const isSelected = this.props.isSelected;
    const isMatched = this.props.isMatched;

    return (
      <div
        className={`card${isSelected ? " selected" : ""} ${
          isMatched ? " matched" : ""
        }`}
        onClick={this.handleClick}
      >
        <div className="card__front">{this.props.name}</div>
        <div className="card__back">?</div>
      </div>
    );
  }
}

export default Card;
