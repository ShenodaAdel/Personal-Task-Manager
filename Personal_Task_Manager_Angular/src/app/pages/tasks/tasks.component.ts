import { Component } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from "../navbar/navbar.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

}
