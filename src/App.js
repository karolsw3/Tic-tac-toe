import React, { Component } from 'react';
import styled from 'styled-components';

import Board from './components/Board'

const Game = styled.div`
  font-family: 'Rammetto One', cursive;
  font-size: 28px;
  line-height: 18px;
  text-align: center;
  cursor: default;
  color: #fff;
  margin: 0;
  font-weight: 900;
`

const Header = styled.h1`
  font-size: 35px;
`

const Bottom = styled.h3`
  font-size: 16px;
  font-weight: 100;
`

class App extends Component {

  render() {
    return (
      <Game>
        <Header>tic-tac-toe</Header>
        <Board />
        <Bottom>By Karol Swierczek</Bottom>
      </Game>
    );
  }
}

export default App;
