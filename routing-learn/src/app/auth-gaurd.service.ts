import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGaurdService implements CanActivate ,CanActivateChild{

  constructor(private authService:AuthService, private router:Router) { }

  canActivate(route:ActivatedRouteSnapshot,
  state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    // this.authService.logIn();
    return this.authService.isAuthenticated()
      .then(
        (authenticatedStat:boolean)=>{
          if(authenticatedStat === true ){
            return true;
          }
          else{
            this.router.navigate(['/']);
            return false;
          }
        }
      );
  }

  canActivateChild(route:ActivatedRouteSnapshot,
  state:RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean{
    return this.canActivate(route,state);
  }
}
