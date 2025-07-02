import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive,NgIf],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  private readonly router=inject(Router);
  // isClose: boolean = false;
  logout():void{
    localStorage.removeItem('UserLogin');
    this.router.navigate(['/login']);

  }
  // closeSidebar():void {
  //   console.log(this.isClose)
  //   this.isClose=!this.isClose;

  // }

}
