import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered? :boolean;
}

@Injectable({
    providedIn:'root'
})
export class AuthService {
    userSub = new BehaviorSubject<User>(null);
    tokenExpirationTimer:any;

    constructor(private http:HttpClient,
                private router:Router){}
    signup(email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD7z5Lx6XpLCecXX6WHVJ8XAgcamLHPNrI',
        {
            email: email,
            password: password,
            returnSecureToken:true     
        }
        ).pipe ( catchError(this.handleError),
                //  tap(this.handleAuthentication())
                tap(resData=>{
                    this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
                    }
                )
        );
    }

    login(email:string,password:string){
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD7z5Lx6XpLCecXX6WHVJ8XAgcamLHPNrI',
        {
            email: email,
            password: password,
            returnSecureToken:true     
        }
        )
        .pipe ( catchError(this.handleError),
                // tap(this.handleAuthentication)    
                tap(resData=>{
                    this.handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
                    }
                    )  
        );
    }   
    
    autoLogin(){
       const userData:{email:string,id:string,_token:string,_tokenExpirationDate:string} =  JSON.parse(localStorage.getItem('userData'));
       if(!userData){
           return;
       }
       const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
        // token getter in user model    
       if(loadedUser.token){
            this.userSub.next(loadedUser);
            const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
       }
    }

    logout(){
        this.userSub.next(null);
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData');
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer=null;
    }

    // expirationDuration in milli seconds
    autoLogout(expirationDuration:number){
        console.log(expirationDuration);
        this.tokenExpirationTimer = setTimeout(()=>{
            this.logout();
        },expirationDuration);

    }
    // private handleAuthentication(resData:AuthResponseData){
    //     console.log('resData',resData);
    //     const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn) * 1000); //getTime() returns in milli seconds
    //           const user = new User(
    //               resData.email,
    //               resData.localId,
    //               resData.idToken,
    //               expirationDate
    //           );
    //           console.log('user:',user,typeof user);
    //           this.userSub.next(user);
    // }

    private handleAuthentication(email:string,userId:string,token:string,expiration:number){
        const expirationDate = new Date(new Date().getTime() + expiration * 1000);
        const user =new User(email,userId,token,expirationDate);
        this.userSub.next(user);
        this.autoLogout(expiration * 1000);
        localStorage.setItem('userData',JSON.stringify(user));
    }



    private handleError(errorResponse: HttpErrorResponse){
                let errorMessage = 'An unknown error occured';
                if(!errorResponse.error || !errorResponse.error.error){
                    return throwError(errorMessage);
                }
                switch(errorResponse.error.error.message){
                    case 'EMAIL_EXISTS':
                        errorMessage = 'The email address is already in use by another account.';
                        break;
                    case 'OPERATION_NOT_ALLOWED':
                        errorMessage = 'Password sign-in is disabled for this project.';
                        break;
                    case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
                        break;
                    case 'EMAIL_NOT_FOUND':
                        errorMessage='There is no user record corresponding to this identifier.';
                        break;
                    case 'INVALID_PASSWORD':
                        errorMessage=' The password is invalid or the user does not have a password.'
                        break;

                }
                return throwError(errorMessage);
    }

}