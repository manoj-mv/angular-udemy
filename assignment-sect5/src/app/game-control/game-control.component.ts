import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-game-control',
  templateUrl: './game-control.component.html',
  styleUrls: ['./game-control.component.css']
})
export class GameControlComponent implements OnInit {
  counter: number;
  interval;
  @Output() counter_incr_event = new EventEmitter<number>();
  constructor() {
    this.counter = 0;
  }

  ngOnInit(): void {
  }
  startGame() {
    console.log('started')

    this.interval = setInterval(() => {
      // console.log(++this.counter);
      this.counter_incr_event.emit(++this.counter);
    }, 1000);
  }
  pauseGame() {
    clearInterval(this.interval);
  }
}
