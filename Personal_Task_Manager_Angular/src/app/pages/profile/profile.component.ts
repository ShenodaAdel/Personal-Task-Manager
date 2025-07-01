import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IUser } from '../../core/interface/i-user';

@Component({
  selector: 'app-profile',
  imports: [RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  User: IUser = {}  as IUser;


  ngOnInit(): void {
    const userData = localStorage.getItem('User');
    if (userData) {
      this.User = JSON.parse(userData);
     
    }
  }

}
