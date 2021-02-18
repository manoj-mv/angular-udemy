import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  error_message:string;
  constructor(private currentRoute:ActivatedRoute) { }

  ngOnInit(): void {
    // this.error_message = this.currentRoute.snapshot.data['message'];
    this.currentRoute.data.subscribe(
      (data:Data)=>{
        this.error_message = data.message;
      }
    );
  }

}
