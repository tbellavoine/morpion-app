import { Component } from '@angular/core';
import { MorpionService } from '../shared/services/morpion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title : string = 'Morpion';
  squares : Array<any> = [];
  isEnd: boolean = false;
  round : number;
  scoreP1 : number = 0;
  scoreP2 : number = 0;
  resultats : string = '';
  
  constructor(private morpionService: MorpionService) {
    this.squares = this.morpionService.squares;
    this.round = this.morpionService.round;
  }

  chooseSquare(i: number) {
    if (this.morpionService.round === 0) {
      this.play(i);
    }
  }

  play(i: number){
    if (this.morpionService.squares[i].value === '' && !this.isEnd) {
      
      this.morpionService.emptySquares -= 1;

      if (this.morpionService.round === 0) {
        this.morpionService.squares[i].setValue('O');
      } else {
        this.morpionService.squares[i].setValue('X');
      }

      if (this.morpionService.checkWinner()) {

        this.gameOver();
        return;

      } else {

        if (this.morpionService.emptySquares === 0) {
          this.morpionService.draw = true;
          this.gameOver();
          return;
        } else {
          this.round = this.morpionService.turnChange();
          if (this.morpionService.round === 1) {
            this.iaTurn();
          }
        }
      }

    } else {
      return;
    }
  }

  iaTurn() {
    const move = this.morpionService.iaMove() - 1;

    if (this.morpionService.squares[move].value === '') {

      setTimeout(() => {
        this.play(move);
      }, 500);

    } else {
      this.iaTurn();
    }
  }
  
  gameOver(){
    this.isEnd = true;
    this.resultats = this.morpionService.getResultats();
  }

  restartGame() {
    this.morpionService.initMorpion();
    this.squares = this.morpionService.squares;
    this.isEnd = false;
    this.round = 0;
  }
}
