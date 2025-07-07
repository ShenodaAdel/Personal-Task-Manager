import { Component, inject, OnChanges, OnInit, Pipe, PLATFORM_ID } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from "../navbar/navbar.component";

import { DatePipe, isPlatformBrowser, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { Task } from '../../core/interface/CTasks';

import { pipe } from 'rxjs';
import { TaskService } from '../../core/service/Task/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [NgIf, FormsModule, RouterLink, DatePipe],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private readonly toastrService = inject(ToastrService);
  private readonly taskService = inject(TaskService);
  private readonly platformId = inject(PLATFORM_ID);
  isOpen: boolean = false;
  task: Task = new Task();
  tasks: Task[] = [];
  filePreviewUrl: string = ''; // لو حابة تعرضي اسم الملف أو تفاصيله
  Ncompleted: number = 0;
  NinProgress: number = 0;
  Npending: number = 0;

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
        // const base64File = reader.result as string;
        (this.task as any).upload_file = reader.result as string;
        console.log('Base64 File:', (this.task as any).upload_file);
        const formData = new FormData();
        formData.append('Tasks', JSON.stringify(this.task));
        this.tasks.push(this.task);
        localStorage.setItem('taskData', JSON.stringify(this.tasks));
        this.taskService.upadateTask(this.tasks);
        this.toastrService.success("تمت إضافة المهمة بنجاح", "نجاح");
        this.closeModal();
        this.task = new Task();
      };

    } else {
      this.toastrService.error('Please attach a file.');
    }
  }
  deleteTask(index: number): void {
    console.log('Task deleted at index:', index);
    this.tasks.splice(index, 1);
    localStorage.setItem('taskData', JSON.stringify(this.tasks));
    console.log('Updated tasks after deletion:', this.tasks);
    this.toastrService.success("Task deleted successfully", "Success");
    this.updateCounters();
  }
  updateCounters(): void {
    this.Ncompleted = 0;
    this.NinProgress = 0;
    this.Npending = 0;

    for (let task of this.tasks) {
      if (this.task.status === 'Completed') {
        this.Ncompleted++;
      } else if (this.task.status === 'In Progress') {
        this.NinProgress++;
      } else {
        this.Npending++;
      }
    }
  }
  ngOnInit(): void {
 
    if (isPlatformBrowser(this.platformId)) {
      this.tasks = JSON.parse(localStorage.getItem('taskData') || '[]');

      console.log('Tasks from localStorage:', this.tasks);
      this.updateCounters();
      this.taskService.task$.subscribe((data) => {
        if (data) {
          this.tasks = data;
          this.updateCounters();

        } else {
          localStorage.setItem('taskData', JSON.stringify(this.tasks));
        }
      });
    }

  }


}
