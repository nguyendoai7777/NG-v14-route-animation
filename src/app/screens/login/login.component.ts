import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule, ValidationErrors,
  ValidatorFn,
  Validators
} from '@angular/forms';

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
  forbiddenName: {
    value: string;
    errorText: string;
  }
}

export function forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
  return (control: AbstractControl): ErrorEmail | null => {
    const forbidden = nameRe.test(control.value);
    return forbidden ? { forbiddenName: { value: control.value, errorText: 'Invalid Format' } } : null;
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [
    FormBuilder
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup<LoginFormType>;

  constructor(
    private readonly fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    /*this.loginForm = this.fb.group<LoginFormType>({
      email: new FormControl('', {nonNullable: true}),
      password: new FormControl('', {nonNullable: true})
    })*/
    this.loginForm = this.fb.group<LoginFormType>({
      email: this.fb.nonNullable.control('', [Validators.required, forbiddenNameValidator(/bob/gi)]),
      password: this.fb.nonNullable.control(''),
    });
  }

  get getLoginForm() {
    return this.loginForm.controls;
  }

}
