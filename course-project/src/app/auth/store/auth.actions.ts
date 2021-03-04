import { EmailValidator } from "@angular/forms";
import { Action } from "@ngrx/store";

export const LOGIN_START = '[auth] Login Start';
export const AUTHENTICATE_SUCCESS = '[Auth] Login Success';
export const AUTHENTICATE_FAIL = '[Auth] Login Failed';
export const SIGNUP_START = '[Auth] Signup Start';
export const CLEAR_ERROR = '[Auth] Clear Error';
export const LOGOUT = '[Auth] Logout';
export const AUTO_LOGIN = '[Auth] Auto Login'

export class LoginStart implements Action{
    readonly type = LOGIN_START;
    constructor(public payload:{email:string,password:string}){}
}

export class AuthenticateSuccess implements Action{
    readonly type= AUTHENTICATE_SUCCESS;
    constructor(
        public payload:{
            email:string,
            userId:string,
            token:string,
            expirationDate:Date,
            redirect:boolean
        }
    ){}
}

export class AuthenticateFail implements Action{
    readonly type = AUTHENTICATE_FAIL;
    constructor(public payload: {errMessage:string}){}
}


export class SignupStart implements Action{
    readonly type = SIGNUP_START;
    constructor(public payload:{email:string, password:string}){}
}

export class clearError implements Action{
    readonly type = CLEAR_ERROR;
}

export class LogOut implements Action{
    readonly type = LOGOUT;
    // constructor(public payload:{route:string}){}

}


export class autoLogin implements Action{
    readonly type = AUTO_LOGIN;
}

export type AuthActionTypes =   AuthenticateSuccess | LogOut | 
                                LoginStart | AuthenticateFail |
                                SignupStart | clearError |
                                autoLogin;