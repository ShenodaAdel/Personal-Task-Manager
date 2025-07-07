import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../core/interface/CTasks';
import { User } from '../../core/interface/CUser';
import { UserServiceService } from '../../core/service/userService/user.service';
import { TaskService } from '../../core/service/Task/task.service';
import { platformBrowser } from '@angular/platform-browser';
import { HelpService } from '../../core/service/help/help.service';

@Component({
  selector: 'app-navbar',
  imports: [NgIf, RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private readonly toastrService = inject(ToastrService);
  private readonly userService = inject(UserServiceService);
  private readonly taskService = inject(TaskService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly helpService=inject(HelpService);
  isOpen: boolean = false;
  tasks: Task[] = [];
  task:Task =new Task();
  user: User = new User();
  filePreviewUrl: string = ''; // لو حابة تعرضي اسم الملف أو تفاصيله
  numberNotification: any[] = [];
  openModal(): void {
    this.isOpen = true;
  }
  closeModal(): void {
    this.isOpen = false;
  }

  onFileChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.task.upload_file = input.files[0];
      this.filePreviewUrl = this.task.upload_file.name;
      console.log('Selected file:', this.task.upload_file);
    }
  }

  submitTask(): void {
    const file = this.task.upload_file;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
          (this.task as any).upload_file = reader.result as string;
        console.log('Base64 File:', (this.task as any).upload_file);
        const formData = new FormData();
        formData.append('Tasks', JSON.stringify(this.task));
        this.tasks.push(this.task);
        localStorage.setItem('taskData', JSON.stringify(this.tasks));
        this.taskService.upadateTask(this.tasks);
        this.toastrService.success("Task added successfully", "Success");
        this.closeModal();
      


      };

    } else {
      this.toastrService.error('Please attach a file.');
    }
  }
    ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.tasks = JSON.parse(localStorage.getItem('taskData') || '[]');

      this.userService.user$.subscribe((data) => {
        if (data) {
          this.user = data;
        } else {
          this.user = JSON.parse(localStorage.getItem('UserLogin') || '{}');
        }
      });
      this.helpService.helps$.subscribe((data) => {
        if (data) {
          this.numberNotification = data;
        } else {
          const stored = localStorage.getItem('help');

          const parsed = stored ? JSON.parse(stored) : null;
          this.numberNotification = Array.isArray(parsed) ? parsed : parsed ? [parsed] : [];
        }
      });



    }

  }
}




