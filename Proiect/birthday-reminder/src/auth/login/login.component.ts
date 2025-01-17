import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private notification: NzNotificationService) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      rememberMe: [false]
    });
  }

  onSubmit(): void {
    if(this.loginForm.valid) {
      //apel la serviciu autentificare
      this.authService.login(this.loginForm.value).subscribe({
        next: (response) => {
          console.log('Login successful', response);
          this.authService.setToken(response.token);
          if(this.loginForm.value.rememberMe) {
            localStorage.setItem('token', response.token);
          } else {
            sessionStorage.setItem('token', response.token);
          }
          this.router.navigate(['/birthday/friends']);
          //this.notification.success('Login Successful', 'You have successfully logged in.');

        },
        error: (err) => {
          console.error('Login failed', err.message);
          this.notification.error('Login failed', 'Invalid credentials, please try again.');
        }
      });
    } else {
      console.log('Form invalid');
    }
  }
}
