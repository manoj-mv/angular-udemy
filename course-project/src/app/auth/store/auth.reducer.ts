import { User } from "../user.model";
import * as authActions from './auth.actions';
export interface authState{
    user:User;
    authError:string;
    loading:boolean;
}

const initialState: authState={
    user :null,
    authError: null,
    loading:false
}
export function authReducer(state=initialState,action:authActions.AuthActionTypes){
    switch(action.type){
        case authActions.LOGIN_START:
        case authActions.SIGNUP_START:
            return {
                ...state,
                authError:null,
                loading:true
            }
        case authActions.AUTHENTICATE_SUCCESS:
            const user = new User ( action.payload.email,
                                    action.payload.userId,
                                    action.payload.token,
                                    action.payload.expirationDate);
            return {
                ...state,
                user:user,
                authError:null,
                loading:false
            }
        
        case authActions.AUTHENTICATE_FAIL:
            return{
                ...state,
                user:null,
                authError: action.payload.errMessage,
                loading:false
            }    
        
        case authActions.CLEAR_ERROR:
            return{
                ...state,
                authError:null
            }
        case authActions.LOGOUT:
            return {
                ...state,
                user: null
            }

        default:
            return state;
    }
}