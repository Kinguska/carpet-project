import { Component } from '@angular/core';
import {MatButtonModule } from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/models/User';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
  signupForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
    password2: new FormControl('')
  });

  constructor(private router: Router, private authService: AuthService, private userService: UserService) {
  }

  onSubmit() {
    if (this.signupForm.invalid) {
      alert('Invalid form');
      return;
    }
    this.signupForm.get('email')?.addValidators([Validators.required]);
    this.signupForm.get('password')?.addValidators([Validators.required]);

    if (this.signupForm.value.email === '' || this.signupForm.value.password === '' || this.signupForm.value.password2 === '') {
      alert('Please fill in all fields');
      return;
    }
    else if (this.signupForm.value.password !== this.signupForm.value.password2) {
      alert('Passwords do not match');
      return;
    }
    else if (this.signupForm.value.password!.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }

    this.authService.signup(this.signupForm.value.email!, this.signupForm.value.password!).then(credential => {
      const user: User = {
        id: credential.user?.uid!,
        email: this.signupForm.value.email!
      };
      this.userService.createUser(user).then(() => {
        alert('Signup successful');
        this.router.navigateByUrl('/');
      }
      ).catch(e => {
        console.error('User creation failed');
      });
    }).catch(e => {
      if (e.code === 'auth/email-already-in-use') {
        alert('Email already in use');
        return;
      }
      alert('Signup failed');
    });
  }

}
