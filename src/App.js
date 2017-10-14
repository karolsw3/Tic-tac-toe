import React, { Component } from 'react';
import styled from 'styled-components';

import Board from './components/Board'

const Game = styled.div`
  line-height: 18px;
  text-align: center;
  cursor: default;
  color: #fff;
  margin: 0;
  font-weight: 900;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
    this.startGame = this.startGame.bind(this);
    this.endGame = this.endGame.bind(this);
    this.state = {
      gameHasStarted: false,
      playVsAI: false
    };
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

  startGame(playVsAI){
    if(playVsAI){
      this.setState({
        playVsAI: true
      });
    }else{
      this.setState({
        playVsAI: false
      });      
    }
    this.setState({
      gameHasStarted: true
    });
  }

  endGame(){
    this.setState({
      gameHasStarted: false
    });
  }

  render() {

    var gameCard;
    var backButton;

    if(!this.state.gameHasStarted){
      gameCard = (
        <div>
          <button onClick={()=>{this.startGame(true)}}>Play VS AI</button>
          <button onClick={()=>{this.startGame(false)}}>Play VS Friend</button>
        </div>
      );
    }else{
      gameCard = <Board randomBackground={this.randomBackground} playVsAI={this.state.playVsAI}/>
      backButton = <button onClick={this.endGame}><img src="images/back.png" height="40" alt="Back"/></button>
    }

    return (
      <Game>
        <Header>tic-tac-toe</Header>
        {gameCard}
        {backButton}
        <Bottom>By Karol Swierczek</Bottom>
      </Game>
    );
  }
}

export default App;
