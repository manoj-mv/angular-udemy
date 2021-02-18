import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';


export interface canComponentDeactivate{
  canDeactivate: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root'
})
// CanDeactivate() is actually of a generic type, Here we implement our own return type f
// for canDeactivate using interface 'canComponentDeactivate'
export class CanDeactivateGaurdService implements CanDeactivate<canComponentDeactivate>{

  constructor() { }
  canDeactivate(component: canComponentDeactivate,
    currentRoute:ActivatedRouteSnapshot,
    currentState:RouterStateSnapshot,
    nextState?: RouterStateSnapshot):Observable<boolean> | Promise<boolean> | boolean{
      return component.canDeactivate();
    }
}
