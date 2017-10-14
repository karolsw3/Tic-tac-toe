import React, { Component } from 'react';
import styled from 'styled-components';

import Square from './Square';

const BoardStyle = styled.table`
  text-align: center;
  border-collapse: collapse;
  margin: 0 auto;
`;

const Row = styled.tr`

`

class Board extends Component {

  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      XisNext: true,
      gameHasEnded: false
    };
    this.checkIfGameHasEnded = this.checkIfGameHasEnded.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.restart = this.restart.bind(this);
  }

  renderSquare(i){
    return <Square value={this.state.squares[i]} onClick={() => {this.handleClick(i)}}/>
  }

  checkIfGameHasEnded(squares){
      var winCombinations = [
        [0,1,2],[3,4,5],[6,7,8], // Rows
        [0,3,6],[1,4,7],[2,5,8], // Columns
        [0,4,8],[2,4,6] // Diagonally
      ];

      for(let i=0; i<winCombinations.length;i++){
        const [a, b, c] = winCombinations[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
          if(!this.state.gameHasEnded){
            this.setState({
              gameHasEnded: true
            });
          }
          return squares[a];
        }
      }
      return null;
  }

  handleClick(i){
    var squares = this.state.squares.slice();
    if(!squares[i] && !this.state.gameHasEnded){ // Check if clicked square is empty
      squares[i] = this.state.XisNext ? "X" : "O"; 
      
      this.setState({
        squares: squares,
        XisNext: !this.state.XisNext
      });
    }
  }

  restart(){
    this.setState({
      squares: Array(9).fill(null),
      XisNext: true,
      gameHasEnded: false
    })
    this.props.randomBackground();
  }

  render() {
    var winner = this.checkIfGameHasEnded(this.state.squares) ? "Winner: "+ this.checkIfGameHasEnded(this.state.squares) : null;
    var whoIsNext = winner ? null : (this.state.XisNext ? "X" : "O") + "'s turn";
    var boardIsFull = false;
    // Check if board is full
    var count = 0;
    for(let i=0;i<9;i++){
      if(this.state.squares[i]){
        count++;
      }
    }
    if(count === 9){
      winner = winner ? winner : "Draw";
      whoIsNext = null;
      boardIsFull = true;
    }
    //

    /* MAGICAL AI */

    if(this.props.playVsAI && !this.state.XisNext && !this.state.gameHasEnded){

      var squares = this.state.squares.slice();

      var end = false;

      // Check if there are any places to place third char
      var winCombinations = [
        [0,1,2],[3,4,5],[6,7,8], // Rows
        [0,3,6],[1,4,7],[2,5,8], // Columns
        [0,4,8],[2,4,6] // Diagonally
      ];
  
      for(let i=0; i<winCombinations.length; i++){
        const [a, b, c] = winCombinations[i];
        if(squares[a] === "O" && squares[a] === squares[b] && !end){
          if(!squares[c]){
            squares[c] = "O";
            end = true;
          }
        }else if(squares[c] === "O" && squares[c] === squares[b] && !end){
          if(!squares[a]){
            squares[a] = "O";
            end = true;
          }
        }else if(squares[c] === "O" && squares[c] === squares[a] && !end){
          if(!squares[b]){
            squares[b] = "O";
            end = true;
          }
        }
      }

      // Check if oponnent placed any two chars nearby to prevent him to win.
      for(let i=0; i<winCombinations.length; i++){
        const [a, b, c] = winCombinations[i];
        if(squares[a] === "X" && squares[a] === squares[b] && !end){
          if(!squares[c]){
            squares[c] = "O";
            end = true;
          }
        }else if(squares[c] === "X" && squares[c] === squares[b] && !end){
          if(!squares[a]){
            squares[a] = "O";
            end = true;
          }
        }else if(squares[c] === "X" && squares[c] === squares[a] && !end){
          if(!squares[b]){
            squares[b] = "O";
            end = true;
          }
        }
      }

      // Place char randomly (on a free slot ofc)
      while(!end && !boardIsFull){
        var random = Math.floor(Math.random() * 9);
        if(!squares[random]){
          squares[random] = "O";
          end = true;
        }
      }

      // Place choosen char on the board and change the player
      this.setState({
        squares: squares,
        XisNext: !this.state.XisNext
      });
    }
    /* END  OF MAGICAL AI SCRIPT */

    return(
      <div>
        <p>{whoIsNext}</p>
        <p>{winner}</p>
        <BoardStyle>
          <tbody>
            <Row>
              <th>{this.renderSquare(0)}</th>
              <th>{this.renderSquare(1)}</th>
              <th>{this.renderSquare(2)}</th>
            </Row>
            <Row>
              <th>{this.renderSquare(3)}</th>
              <th>{this.renderSquare(4)}</th>
              <th>{this.renderSquare(5)}</th>
            </Row>
            <Row>
              <th>{this.renderSquare(6)}</th>
              <th>{this.renderSquare(7)}</th>
              <th>{this.renderSquare(8)}</th>
            </Row>
          </tbody>
        </BoardStyle>
        <button onClick={this.restart}><img src="images/refresh.png" height="50" alt="Restart"/></button>
      </div>
    );
  }
}

export default Board;
