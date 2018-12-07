import React from "react";
import Message from "./components/Message";
import Header from "./components/Header";
import Card from "./components/Card";
import { shuffleCards } from "./helpers";
import "./App.scss";

/* to do
- Timer - counts down from 60 seconds, once all cards have been matched, remaining seconds are added to final score.
- Score - each pair of matched cards = 10 points
- Score - matching multiple pairs in a row earns bonus points
- When the game ends css wiggle all cards
- After 2 cards selected, disable all other cards from being clicked, delay then auto flip cards back if not matched.
- restart buttons
- prevent highlightings
- change the background colour on the back of card to teal
- leaderboard


*/
const cards = [
  "🐸",
  "🐵",
  "🐶",
  "🐱",
  "🐭",
  "🐼",
  "🐯",
  "🦁",
  "🐷",
  "🍏",
  "🍉",
  "🍒",
  "🍍",
  "🍌",
  "🍓",
  "🍇",
  "🍗",
  "🍖"
];

class App extends React.Component {
  state = {
    cards: shuffleCards(cards.concat(cards).slice()),
    selected: [],
    matched: [],
    score: 0,
    message: "Match the Pairs"
  };

  cardSelected = id => {
    const selected = [...this.state.selected, id];
    this.setState({ selected: selected }, this.checkSelectedCards);
  };

  isGameComplete = () => {
    if (this.state.cards.length === this.state.matched.length) {
      this.setState({
        message: "You are the best there ever was and ever will be!!!!!!"
      });
    }
  };

  resetGame = () => {
    //clear matched and selected array
    this.setState({
      matched: [],
      selected: [],
      cards: shuffleCards(cards.concat(cards).slice()),
      score: 0
    });
  };

  checkSelectedCards = () => {
    const cards = [...this.state.cards];
    const selected = [...this.state.selected];

    if (this.state.selected.length === 3) {
      //check for 3rd click and remove 1st and 2nd cards leaving the 3rd as the new 1st
      this.setState({ selected: selected.splice(-1, 1) });
    }

    //check if 2 cards have been selected
    if (this.state.selected.length === 2) {
      //check if first card matches second card
      if (cards[selected[0]] === cards[selected[1]]) {
        console.log("match");
        const matched = [...this.state.matched, selected[0], selected[1]];
        this.setState({ matched }, () => this.isGameComplete());

        this.setState({ score: this.state.score + 10 });
      } else {
        console.log("no match");
      }
    }
  };

  renderCards() {
    const selected = [...this.state.selected];
    const matched = [...this.state.matched];

    return this.state.cards.map((name, id) => (
      <Card
        key={id}
        index={id}
        name={name}
        isSelected={selected.includes(id)}
        isMatched={matched.includes(id)}
        cardSelected={this.cardSelected}
      />
    ));
  }

  render() {
    return (
      <div className="App">
        <h1>React JS Memory Game</h1>
        <Header score={this.state.score} resetGame={this.resetGame} />
        <Message message={this.state.message} />
        <div className="card-list">{this.renderCards()}</div>
      </div>
    );
  }
}

export default App;
