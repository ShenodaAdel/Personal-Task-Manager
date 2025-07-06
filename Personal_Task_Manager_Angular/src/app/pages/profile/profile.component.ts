import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../core/interface/i-user';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {
   private readonly platformId=inject(PLATFORM_ID);
  user:User=new User();


  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
    const userData = localStorage.getItem('UserLogin');
    if (userData) {
      this.user = JSON.parse(userData);
     
    }
  }
  }

}
