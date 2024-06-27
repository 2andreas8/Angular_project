import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors, ValidatorFn, Form } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { NzFormNoStatusService } from 'ng-zorro-antd/core/form';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.createPasswordStrengthValidator()]],
      confirmPassword: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });
  }

  onSubmit(): void {
    if(this.registerForm.valid) {
      this.authService.register(this.registerForm.value).subscribe({
        next: (response) => {
          console.log('Registration successful', response);
          //navigam catre login sau dashboard dupa inregistrare
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Registration failed', err);
        }
      })
    }
  }

  passwordMatchValidator(group: FormGroup): any {
    return group.get('password')?.value === group.get('confirmPassword')?.value
    ? null
    : { missmatch: true}    
  }

  createPasswordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;
      if(!value) {
        return null;
      }
      const hasUpperCase = /[A-Z]+/.test(value);
      const hasLowerCase = /[a-z]+/.test(value);
      const hasNumeric = /[0-9]+/.test(value);
      const hasSpecial = /[\W_]+/.test(value);
      const valid = hasUpperCase && hasLowerCase && hasNumeric && hasSpecial;
      if(!valid) {
        return { strong: 'Your password is too weak.'}
      }

      return null
    }
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if(control && control.hasError('required')) {
      return 'Please enter a ' + field;
    } else if(control && control.hasError('email')) {
      return 'Please enter a valid email';
    } else if(control && control.hasError('strong')) {
      return control.getError('strong');
    }
    return '';
  }
  
}
