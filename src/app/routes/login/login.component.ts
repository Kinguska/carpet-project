import { Component} from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loading = false;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
  }

  loginForm = this.createForm({
    email: '',
    password: ''
  });

  createForm(model: any) {
    let formGroup = this.fb.group<{
      email: string,
      password: string
    }>(model);
    formGroup.get('email')?.addValidators([Validators.required]);
    formGroup.get('password')?.addValidators([Validators.required]);
    return formGroup;
  }

  login() {
    if (this.loginForm.invalid) {
      alert('Invalid form');
      return;
    }
    else if (this.loginForm.value.email === '' || this.loginForm.value.password === '') {
      alert('Please fill in all fields');
      return;
    }
    this.loading = true;
    this.authService.login(this.loginForm.value.email!, this.loginForm.value.password!).then(credential => {
      alert('Login successful');
      this.router.navigateByUrl('/');
    }).catch(e => {
      if (e.code === 'auth/invalid-credential') {
        alert('Email not found or wrong password');
        return;
      }
      alert('Login failed');
    }).finally(() => {
      this.loading = false;
    });
  }
}
