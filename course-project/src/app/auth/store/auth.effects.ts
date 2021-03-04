import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { of, throwError } from "rxjs";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import { AuthService } from "../auth.service";

import * as authActions from '../store/auth.actions';
import { User } from "../user.model";


export interface AuthResponseData{
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered? :boolean;
}


const handleAuthentication = (email:string,userId:string,token:string,expiresIn:number) => {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(email,userId,token,expirationDate);
    localStorage.setItem('userData',JSON.stringify(user));
    return new authActions.AuthenticateSuccess({
        email,
        userId,
        token,
        expirationDate: expirationDate,
        redirect:true
    });
}

const handleError = (errorResponse:any) => {
    let errorMessage = 'An unknown error occured';
    if(!errorResponse.error || !errorResponse.error.error){
        return of(new authActions.AuthenticateFail({errMessage:errorMessage}))
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
        return of(new authActions.AuthenticateFail({errMessage:errorMessage}));
}

@Injectable()
export class AuthEffects{
    constructor(private actions$:Actions,
                private http:HttpClient,
                private router:Router,
                private store:Store,
                private authService:AuthService){}

    // side effect -signup request
    @Effect()
    authSignup = this.actions$.pipe(
        ofType(authActions.SIGNUP_START),
        switchMap(
            (signupActionData: authActions.SignupStart) =>{
                console.log(signupActionData);
                return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + environment.firebaseAPIKey,
                    {
                        email: signupActionData.payload.email,
                        password: signupActionData.payload.password,
                        returnSecureToken:true  
                    }
                ).pipe(
                    tap(
                        resData=>{
                            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                        }
                    ),
                    map(
                        resData=>{
                            return handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
                        }
                    ),
                    catchError(
                        error=>{
                            return handleError(error);
                        }
                    )
                );
            }
        )
    )
    // side effect- login request
    @Effect()
    authLogin = this.actions$.pipe(
        ofType(authActions.LOGIN_START),
        switchMap(
            (authData:authActions.LoginStart) =>{
                return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + environment.firebaseAPIKey,
                    {
                        email: authData.payload.email,
                        password: authData.payload.password,
                        returnSecureToken:true     
                    }
                )
                .pipe(
                    tap(
                        resData=>{
                            this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                        }
                    ),
                    map(
                        resData =>{
                            return handleAuthentication(resData.email,resData.localId,resData.idToken,+resData.expiresIn);
                        } 
                    ),
                    catchError(
                        errorResponse=>{
                            return handleError(errorResponse);
                        }
                    )          
                )
            }
        ),
    );
    // side effect - navigation after successfull authentication/login
    @Effect({dispatch:false})
    authRedirect = this.actions$.pipe(
        ofType(authActions.AUTHENTICATE_SUCCESS),
        tap(
            (authSuccessAction: authActions.AuthenticateSuccess)=>{
                if(authSuccessAction.payload.redirect){
                    this.router.navigate(['/']);
                }
            }
        )
    )

    // auto login
    @Effect()
    autoLogin = this.actions$.pipe(
        ofType(authActions.AUTO_LOGIN),
        map( ()=>{

            const userData:{email:string,id:string,_token:string,_tokenExpirationDate:string} =  JSON.parse(localStorage.getItem('userData'));
            if(!userData){
                 // need to return something
               return {type:'DUMMY'}; 
            }
            const loadedUser = new User(userData.email,userData.id,userData._token,new Date(userData._tokenExpirationDate));
             // token getter in user model    
            if(loadedUser.token){
                const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
                this.authService.setLogoutTimer(expirationDuration);
                 // this.userSub.next(loadedUser);
                 return new authActions.AuthenticateSuccess({email:loadedUser.email,userId:loadedUser.id,token:loadedUser.token,expirationDate:new Date(userData._tokenExpirationDate),redirect:false});
                //  this.autoLogout(expirationDuration);
            }
            else{
                // need to return something
               return {type:'DUMMY'}; 
            }
        })
    )
    // auto logout
    @Effect({dispatch:false})
    authLogout = this.actions$.pipe(
        ofType(authActions.LOGOUT),
        tap(
            ()=>{
                localStorage.removeItem('userData');
                this.authService.clearLogoutTimer();
                this.router.navigate(['/auth']);
            }
        )
    )
}