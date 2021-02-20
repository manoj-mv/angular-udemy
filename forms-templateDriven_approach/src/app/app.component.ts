import { Component, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('form') formObj: NgForm;
  @ViewChild('uname') username:string;
  defaultQuestion="pet";
  secretAnswer:string="";
  submitstatus:boolean = false;

  user = {
    username:'',
    email:'',
    secretQn:'',
    secretAnswer:'',
    gender:''
  }
  genders = ['male','female','Others'];
  suggestUserName() {
    const suggestedName = 'Superuser';
    this.formObj.form.patchValue(
      {
        userData:{
          username :suggestedName
        }
      }
    );
  }

  // onSubmit(form: NgForm){
  //   console.log(form.controls);
  // }

  onSubmit(){
    // console.log(this.formObj.form.value);
    this.submitstatus = true;
    this.user.username = this.formObj.value.userData.username;
    this.user.email = this.formObj.value.userData.email;
    this.user.secretQn = this.formObj.value.secret;
    this.user.secretAnswer = this.formObj.value.questionAnswer;
    this.user.gender = this.formObj.value.gender;
  }
}
