import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-assignment3',
  templateUrl: './assignment3.component.html',
  styleUrls: ['./assignment3.component.css']
})
export class Assignment3Component implements OnInit {
  toggle_stat = false;
  log=[];
  count = 1;
  constructor() { }

  ngOnInit(): void {
  }
  onToggleAction(){
    this.toggle_stat = !this.toggle_stat;
    this.log.push(new Date());
  }
}
