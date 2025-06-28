import { Component } from '@angular/core';
import { SidebarComponent } from "../../pages/sidebar/sidebar.component";
import { NavbarComponent } from "../../pages/navbar/navbar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main-layout',
  imports: [SidebarComponent, NavbarComponent,RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

}
