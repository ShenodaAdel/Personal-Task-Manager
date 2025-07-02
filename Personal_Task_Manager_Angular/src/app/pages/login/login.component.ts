import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',

})
export class LoginComponent {
  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  login: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-={}\\[\\]:;"\'<>,.?/~`]).{8,}$')
    ])
  });

  submitForm() {
    if (this.login.valid) {
      console.log('Form Submitted', this.login.value);
      const userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]');
      const filteredUserInfo = userInfo.find((user: any) => user.email === this.login.value.email && user.password === this.login.value.password);
      if (!filteredUserInfo) {
        this.toastrService.error('Invalid email or password');
      } else {
        localStorage.setItem('UserLogin', JSON.stringify(filteredUserInfo));
        this.toastrService.success('Login successful!');

        this.login.reset();
        setTimeout(() => {
          this.router.navigate(['/tasks']);
        }, 1000);
      }
    } else {
      console.log('Form is invalid');
      this.toastrService.error('Please fix the errors in the form.');
    }
  }






}
