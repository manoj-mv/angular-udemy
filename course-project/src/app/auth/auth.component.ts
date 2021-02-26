import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PRIMARY_OUTLET, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';
import { AuthService, AuthResponseData } from './auth.service';

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
  constructor(private authService:AuthService,
              private router:Router,
              private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
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

    let authObservable:Observable<AuthResponseData>;
    if(this.isLoginMode){
      authObservable = this.authService.login(email,password)
    }
    else{
      authObservable = this.authService.signup(email,password)
    }

    authObservable.subscribe(
      responseData=>{
        console.log(responseData);
        this.isLoading=false;
        this.router.navigate(['/recipes']);
      },
      error=>{
        console.log(error);
        this.errorState = error;
        this.showErrorAlert(this.errorState);
        this.isLoading=false;
      }
    );
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
      
  }
}
