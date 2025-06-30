import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import { ToastrService } from 'ngx-toastr';
import { userInfo } from 'os';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent  implements OnInit {
  private readonly toastrService=inject(ToastrService);
  private readonly router=inject(Router);
   userInfo: any[] = [];//array to store user information

  ngOnInit(): void {
    this.userInfo = JSON.parse(localStorage.getItem('userInfo') || '[]'); 
  }

  formGroup=new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    userName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    password: new FormControl(null, [
      Validators.required,
      Validators.pattern('^(?=[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\\-={}\\[\\]:;"\'<>,.?/~`]).{8,}$')
    ]),
   
  })
  submit() {
    if (this.formGroup.valid) {
      const user = this.formGroup.value;
      console.log('User registered:', user);
      // Check if user already exists
      const existingUser = this.userInfo.find(u => u.email === user.email && u.userName === user.userName && u.password === user.password);
      if (existingUser) {
        this.toastrService.error('User already exists!');
      } else {
        this.userInfo.push(user);
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        this.toastrService.success('Registration successful!');

      this.formGroup.reset();
      setTimeout(() => this.router.navigate(['/tasks']), 1000);

      }
    } else {
      console.log('Form is invalid');
      this.toastrService.error('Please fix the errors in the form.');
    }
  }
}
