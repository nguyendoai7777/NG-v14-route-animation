import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup, FormGroupDirective, NgForm,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { MatTabsModule } from "@angular/material/tabs";
import { MatButtonModule } from "@angular/material/button";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";

export interface LoginFormType {
  email: FormControl<string>;
  password: FormControl<string>;
}

function customValidatorMail(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return /bob/gi.test(control.value) ? { 'invalidMail': true } : null;
  }
}

interface ErrorEmail {
  forbiddenName?: {
    value: string;
    errorText: string;
  },
  invalid?: boolean;
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ErrorEmail | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value, errorText: 'Invalid Format' } } : null;
  };
}
const REGEX = /^[a-zA-Z_]+[a-zA-Z\d._]*@[a-zA-Z]{2,}(.([a-zA-Z]{2,7})){1,4}$/gi;

export function mailFormatValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ErrorEmail | null => {
    const invalid = !nameRe.test(control.value);
    console.log('match: ', control.value, ' ', nameRe.test(control.value));
    return !invalid ? { invalid } : null;
  };
}


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule
  ],
  providers: [
    FormBuilder
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<LoginFormType>;
  matcher = new MyErrorStateMatcher();
  constructor(
    private readonly fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.loginForm = this.fb.group<LoginFormType>({
      email: this.fb.nonNullable.control('', [
        Validators.required,
        mailFormatValidator( REGEX),
        forbiddenNameValidator(/bob/gi)
      ]),
      password: this.fb.nonNullable.control('', [Validators.required]),
    });

    this.loginForm.controls.email.valueChanges.subscribe(e => {
       console.log('state: ', e, ' ',REGEX.test(e));
    })
  }
  onSubmit(): void {
    if(this.loginForm.invalid) {
      return;
    }
    console.log(this.loginForm.invalid)
  }
  get getLoginForm() {
    return this.loginForm.controls;
  }

}
