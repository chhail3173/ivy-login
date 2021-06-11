import { Component, OnInit } from '@angular/core';
import { AbstractControl, EmailValidator, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.css']
})
export class ReactiveFormComponent implements OnInit {
  myForm:any = FormGroup;
  validate:any;
  
 
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.formValidation();
  }

  formValidation() {
    this.myForm = this.fb.group({
      email: ['',[this.valEmail, Validators.required, Validators.email]],
      password: ['',Validators.minLength(8)]
    }); 
  }

  onSubmit(form:FormGroup):void {
    console.log(form.touched);
    console.log(form.status);
    if(form.status === "VALID"){
      this.validate = 'valid';
      localStorage.setItem("userDetails", JSON.stringify({email:form.value.email, password:form.value.password}));
      
    }else {
      this.validate = 'invalid';
      alert("please fill correct details")
    }
  }

  valEmail(control:AbstractControl):{[key: string]: boolean} | null {
    if(control.value === null ||    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(String(control.value).toLowerCase())) {
      return null;
    }
    return {invalidEmail: true}
  }
}
