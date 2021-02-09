import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'assignment-sect5';
  odd_numbers: number[] = [];
  even_numbers: number[] = [];
  after_counter_incr(counter_val: number) {
    console.log(counter_val);
    if (counter_val % 2 === 0) {
      this.even_numbers.push(counter_val);
    } else {
      this.odd_numbers.push(counter_val);
    }
    // console.log(this.odd_numbers);
  }
}
