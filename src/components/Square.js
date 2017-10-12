import React, { Component } from 'react';
import styled from 'styled-components';

const SquareStyle = styled.button`
  margin: 6px;
  color: #fff;
  padding: 0;
  background: #000;
  width: 80px;
  height: 80px;
  border-radius: 18px;
  border: none;
  font-weight: 900;
  font-size: 40px;
  transition-duration: 0.3s;
  &:hover{
    background: #ccc;
    transition-duration: 0.3s;
  }
`;

const SquareFont = styled.p`
  font-family: 'Rammetto One', cursive;
  margin : 0;
  transition: font 0.9s ease;
`

class Square extends Component {
  constructor(){
    super();
    this.state = {
      disabled: false
    };
  }
  render() {
      return(
        <SquareStyle onClick={()=>{this.props.onClick()}}>
          <SquareFont>{this.props.value}</SquareFont>
        </SquareStyle>
      );
  }
}

export default Square;
