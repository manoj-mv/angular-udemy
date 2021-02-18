import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit() {
  }

  goToServer(id:number){
    //do something
    this.router.navigate(['/servers',id,'edit'],
    {
      queryParams:{allowEdit:'1'},
      fragment: 'loading'
    });
  }

  logIn(){
    this.authService.logIn();
    console.log('login suuccessfull');
  }
  logOut(){
    this.authService.logOut();
    console.log('logout suuccessfull');
  }
}
