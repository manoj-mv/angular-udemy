import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signUpForm :FormGroup;
  forbiddenUserNames=['manoj','m32'];
  

  ngOnInit(){
    this.signUpForm = new FormGroup({
      'userData': new FormGroup({
        'username':new FormControl(null,[Validators.required,this.forbiddenUserNameCheck.bind(this)]),
        'email' : new FormControl(null,[Validators.required,Validators.email],[this.forbiddenEmails]),
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([]),
    });

    this.signUpForm.get('userData.email').statusChanges
      .subscribe((status)=>{
        console.log(status);
      });
  }

  addHobby(){
    console.log(this.signUpForm.get('hobbies'));
    const newFormControl = new FormControl(null,Validators.required);
    (<FormArray>this.signUpForm.get('hobbies')).push(newFormControl);
  }

  getHobbyControls(){
    // const arr = (<FormArray>this.signUpForm.get('hobbies')).controls;
    
    return (<FormArray>this.signUpForm.get('hobbies')).controls;
  }
  onSubmit(){
    console.log(this.signUpForm);
    console.log(this.signUpForm.get('username'));
    
  }

  forbiddenUserNameCheck(control:FormControl):{[str:string]: boolean}{
    console.log(control.value)
    const returnVal = this.forbiddenUserNames.find((val)=>{
      return val===control.value;
    })
    console.log('flg:',returnVal);
    // 
    if(returnVal === control.value){
      return {'forbiddenName':true}
    }
    else{
      return null;
    }
    // if(this.forbiddenUserNames.indexOf(control.value) !== -1){
    //   return {'nameExists':true};
    // }
    // else{
    //   return null;
    // }
  }

  forbiddenEmails(control:FormControl): Promise<any> | Observable<any>{
    const promise = new Promise<any>(
      (resolve,reject)=>{
        setTimeout(()=>{
          if (control.value === 'manoj@neovibe.in'){
            resolve({'forbiddenEmail':true});
          }
          else{
            resolve(null);
          }
        },1500);
      }
    );

    return promise;
  }
}
