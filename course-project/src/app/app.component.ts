import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from './auth/auth.service';
import * as fromApp from './store/app.reducer';
import * as authActions from './auth/store/auth.actions';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService:AuthService,
              private store:Store<fromApp.AppState>,
              @Inject(PLATFORM_ID) private platformId){

  }

  ngOnInit(){
    if(isPlatformBrowser(this.platformId)){
      this.store.dispatch(new authActions.autoLogin());
    }
    console.log("From app component ngOnInit");
  }
}
