import { Injectable } from "@angular/core";
import * as authActions from './store/auth.actions';
import { Store } from "@ngrx/store";
import *  as fromApp from  '../store/app.reducer';


@Injectable({
    providedIn:'root'
})
export class AuthService {
    // userSub = new BehaviorSubject<User>(null);
    tokenExpirationTimer:any;

    constructor(private store: Store<fromApp.AppState>){}
    
    // expirationDuration in milli seconds
    setLogoutTimer(expirationDuration:number){
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(()=>{
            // this.logout();
            this.store.dispatch(new authActions.LogOut());
        },expirationDuration);
    }

    clearLogoutTimer(){
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
            this.tokenExpirationTimer = null;
        }
    }

    
}  