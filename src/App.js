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
  constructor(){
    super();
    this.randomBackground = this.randomBackground.bind(this);
  }
  randomBackground() {
    let colorArray = [];    

    let brightness = 80;
    
    colorArray.push(Math.floor(Math.random() * (255 - brightness) + brightness ));
    colorArray.push(Math.floor(Math.random() * (255 - brightness) + brightness ));
    colorArray.push(Math.floor(Math.random() * (255 - brightness) + brightness ));
    // rgb -> hex
    let color = "#"+colorArray.map( x => x.toString(16)).join('');
    document.body.style.background = color;
  }

  componentWillMount(){
    this.randomBackground();
  }

  render() {
    return (
      <Game>
        <Header>tic-tac-toe</Header>
        <Board randomBackground={this.randomBackground}/>
        <Bottom>By Karol Swierczek</Bottom>
      </Game>
    );
  }
}

export default App;
