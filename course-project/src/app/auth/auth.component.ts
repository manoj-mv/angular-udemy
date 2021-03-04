import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService } from './auth.service';
import * as fromApp from '../store/app.reducer'; 
import { Store } from '@ngrx/store';
import * as authActions from './store/auth.actions';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode =true;
  isLoading=false;
  errorState=null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub:Subscription;
  private storeSub:Subscription;
  constructor(private authService:AuthService,
              private router:Router,
              private componentFactoryResolver: ComponentFactoryResolver,
              private store:Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.storeSub =  this.store.select('auth').subscribe(
        authState => {
          console.log(authState)  
          this.isLoading =  authState.loading;
          this.errorState = authState.authError; 
          if(this.errorState){
            this.showErrorAlert(this.errorState);
          }
        }
    );
  }
  switchMode(){
    this.isLoginMode = !this.isLoginMode;
  }
  onSubmit(form:NgForm){
    this.errorState=null;
    console.log(form.value);
    if(!form.valid){
      return;
    }
    const email = form.value.email;
    const password = form.value.password;
    this.isLoading=true;

    // let authObservable:Observable<AuthResponseData>;
    if(this.isLoginMode){
      // authObservable = this.authService.login(email,password)
      this.store.dispatch(new authActions.LoginStart({email:email,password:password}));
    }
    else{
      // authObservable = this.authService.signup(email,password)
      this.store.dispatch(new authActions.SignupStart({email:email,password:password}));
    }


    // authObservable.subscribe(
    //   responseData=>{
    //     console.log(responseData);
    //     this.isLoading=false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   error=>{
    //     console.log(error);
    //     this.errorState = error;
    //     this.showErrorAlert(this.errorState);
    //     this.isLoading=false;
    //   }
    // );
    form.reset();
  }

  onHandleError(){
    this.errorState=null;
  }

  private showErrorAlert(message:string){
     const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
     const hostViewContainerRef =  this.alertHost.viewContainerRef;
     hostViewContainerRef.clear(); // clear all ccomponents rendered before there

     const componentRef = hostViewContainerRef.createComponent(alertComponentFactory);

     componentRef.instance.message = message;
     this.closeSub = componentRef.instance.close.subscribe(
       ()=>{
          this.closeSub.unsubscribe();
          hostViewContainerRef.clear();
       }
     );
  }

  ngOnDestroy(){
    if(this.closeSub){
      this.closeSub.unsubscribe();
    }

    if(this.storeSub){
      this.storeSub.unsubscribe();
    }
      
  }
}
