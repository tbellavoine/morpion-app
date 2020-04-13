import { Injectable } from '@angular/core';
import { Square } from '../models/Square'
import { Player } from '../models/Player'

@Injectable({
  providedIn: 'root'
})
export class MorpionService {

  player1: Player;
  player2: Player;
  squares: Array<Square> = [];
  emptySquares: number;
  round: any;
  draw: boolean = false;

  constructor() { 
    this.initMorpion();
  }

  initMorpion(){
    this.emptySquares = 9;
    this.round = 0;
    this.draw = false;

    //init squares
    this.squares = [];
    for (let i = 0; i < 9; i++) {
      const square = new Square();
      square.setValue('');
      this.squares.push(square);
    }

    //init players
    this.player1 = new Player();
    this.player2 = new Player();
    this.player2.computer = true;
  }

  turnChange(): number {
    return this.round === 0 ? this.round = 1 : this.round = 0;
  }

  getResultats() {
    if (this.draw) {
      return 'Match null';
    } else {
      if (this.round === 0) {
        return 'Vous avez Gagné !';
      } else {
        return 'Vous avez Perdu !';
      }
    }
  }

  checkWinner() {
    
    const square1 = this.squares[0].value;
    const square2 = this.squares[1].value;
    const square3 = this.squares[2].value;
    const square4 = this.squares[3].value;
    const square5 = this.squares[4].value;
    const square6 = this.squares[5].value;
    const square7 = this.squares[6].value;
    const square8 = this.squares[7].value;
    const square9 = this.squares[8].value;

    const cond1 = square1 && square2 && square3 && (square1 === square2 && square2 === square3);
    const cond2 = square4 && square5 && square6 && (square4 === square5 && square5 === square6);
    const cond3 = square7 && square8 && square9 && (square7 === square8 && square8 === square9);
    const cond4 = square1 && square4 && square7 && (square1 === square4 && square4 === square7);
    const cond5 = square2 && square5 && square8 && (square2 === square5 && square5 === square8);
    const cond6 = square3 && square6 && square9 && (square3 === square6 && square6 === square9);
    const cond7 = square1 && square5 && square9 && (square1 === square5 && square5 === square9);
    const cond8 = square3 && square5 && square7 && (square3 === square5 && square5 === square7);
    
    if (cond1 || cond2 || cond3 || cond4 || cond5 || cond6 || cond7 || cond8) {
      return true;
    } else {
      return false;
    }
  }

  // Mouvement de l'IA
  iaMove(): number {

    let move = this.winMove('X');

    if (move === 0) {
      move = this.blockMove();
    }

    if (move === 0) {
      move = Math.floor(Math.random() * 8) + 1;
    }

    return move;
  }

  // Block player win
  blockMove(){
    const square1 = this.squares[0].value;
    const square2 = this.squares[1].value;
    const square3 = this.squares[2].value;
    const square4 = this.squares[3].value;
    const square5 = this.squares[4].value;
    const square6 = this.squares[5].value;
    const square7 = this.squares[6].value;
    const square8 = this.squares[7].value;
    const square9 = this.squares[8].value;

    //1st line
    if (square1 && square2 && !square3 && (square1 === square2)) {
      return 3;
    }
    if (!square1 && square2 && square3 && (square2 === square3)) {
      return 1;
    }
    if (square1 && !square2 && square3 && (square1 === square3)) {
      return 2;
    }

    //2nd line
    if (square4 && square5 && !square6 && (square4 === square5)) {
      return 6;
    }
    if (!square4 && square5 && square6 && (square5 === square6)) {
      return 4;
    }
    if (square4 && !square5 && square6 && (square4 === square6)) {
      return 5;
    }

    //3rd line
    if (square7 && square8 && !square9 && (square7 === square8)) {
      return 9;
    }
    if (!square7 && square8 && square9 && (square8 === square9)) {
      return 7;
    }
    if (square7 && !square8 && square9 && (square7 === square9)) {
      return 8;
    }

    //1st column
    if (square1 && square4 && !square7 && (square1 === square4)) {
      return 7;
    }
    if (!square1 && square4 && square7 && (square4 === square7)) {
      return 1;
    }
    if (square1 && !square4 && square7 && (square1 === square7)) {
      return 4;
    }

    //2nd column
    if (square2 && square5 && !square8 && (square2 === square5)) {
      return 8;
    }
    if (!square2 && square5 && square8 && (square5 === square8)) {
      return 2;
    }
    if (square2 && !square5 && square8 && (square2 === square8)) {
      return 5;
    }

    //3rd column
    if (square3 && square6 && !square9 && (square3 === square6)) {
      return 9;
    }
    if (!square3 && square6 && square9 && (square6 === square9)) {
      return 3;
    }
    if (square3 && !square6 && square9 && (square3 === square9)) {
      return 6;
    }

    //1st diagonal
    if (square1 && square5 && !square9 && (square1 === square5)) {
      return 9;
    }
    if (!square1 && square5 && square9 && (square5 === square9)) {
      return 1;
    }
    if (square1 && !square5 && square9 && (square1 === square9)) {
      return 5;
    }
    
    //2nd diagonal
    if (square3 && square5 && !square7 && (square3 === square5)) {
      return 7;
    }
    if (!square3 && square5 && square7 && (square5 === square7)) {
      return 3;
    }
    if (square3 && !square5 && square7 && (square3 === square7)) {
      return 5;
    }
    return 0;
  }

  winMove(value: string): number {

    const square1 = this.squares[0].value;
    const square2 = this.squares[1].value;
    const square3 = this.squares[2].value;
    const square4 = this.squares[3].value;
    const square5 = this.squares[4].value;
    const square6 = this.squares[5].value;
    const square7 = this.squares[6].value;
    const square8 = this.squares[7].value;
    const square9 = this.squares[8].value;

    // 1st line
    if (square1 && square2 && !square3 && (square1 === square2 && square2 === value)) {
      return 3;
    }
    if (!square1 && square2 && square3 && (square2 === square3 && square3 === value)) {
      return 1;
    }
    if (square1 && !square2 && square3 && (square1 === square3 && square3 === value)) {
      return 2;
    }

    // 2nd line
    if (square4 && square5 && !square6 && (square4 === square5 && square5 === value)) {
      return 6;
    }
    if (!square4 && square5 && square6 && (square5 === square6 && square6 === value)) {
      return 4;
    }
    if (square4 && !square5 && square6 && (square4 === square6 && square6 === value)) {
      return 5;
    }

    // 3rd line
    if (square7 && square8 && !square9 && (square7 === square8 && square8 === value)) {
      return 9;
    }
    if (!square7 && square8 && square9 && (square8 === square9 && square9 === value)) {
      return 7;
    }
    if (square7 && !square8 && square9 && (square7 === square9 && square9 === value)) {
      return 8;
    }

    // 1st column
    if (square1 && square4 && !square7 && (square1 === square4 && square4 === value)) {
      return 7;
    }
    if (!square1 && square4 && square7 && (square4 === square7 && square7 === value)) {
      return 1;
    }
    if (square1 && !square4 && square7 && (square1 === square7 && square7 === value)) {
      return 4;
    }

    // 2nd column
    if (square2 && square5 && !square8 && (square2 === square5 && square5 === value)) {
      return 8;
    }
    if (!square2 && square5 && square8 && (square5 === square8 && square8 === value)) {
      return 2;
    }
    if (square2 && !square5 && square8 && (square2 === square8 && square8 === value)) {
      return 5;
    }

    // 3rd column
    if (square3 && square6 && !square9 && (square3 === square6 && square6 === value)) {
      return 9;
    }
    if (!square3 && square6 && square9 && (square6 === square9 && square9 === value)) {
      return 3;
    }
    if (square3 && !square6 && square9 && (square3 === square9 && square9 === value)) {
      return 6;
    }

    // 1st diagonal
    if (square1 && square5 && !square9 && (square1 === square5 && square5 === value)) {
      return 9;
    }
    if (!square1 && square5 && square9 && (square5 === square9 && square9 === value)) {
      return 1;
    }
    if (square1 && !square5 && square9 && (square1 === square9 && square9 === value)) {
      return 5;
    }

    // 2nd diagonal
    if (square3 && square5 && !square7 && (square3 === square5 && square5 === value)) {
      return 7;
    }
    if (!square3 && square5 && square7 && (square5 === square7 && square7 === value)) {
      return 3;
    }
    if (square3 && !square5 && square7 && (square3 === square7 && square7 === value)) {
      return 5;
    }

    return 0;

  }
}
