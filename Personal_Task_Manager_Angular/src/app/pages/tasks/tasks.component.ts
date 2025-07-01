import { Component, inject, OnChanges, OnInit, Pipe } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from "../navbar/navbar.component";

import { DatePipe, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { ITask } from '../../core/interface/itasks';

import { pipe } from 'rxjs';
import { TaskService } from '../../core/service/Task/task.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, NgIf, FormsModule, RouterLink, DatePipe],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  private readonly toastrService = inject(ToastrService);
  private readonly taskService = inject(TaskService);
  isOpen: boolean = false;
  tasks: ITask[] = [];
    taskName: string = '';
  startDate: string = '';
  deadline: string = '';
  description: string = '';
  category: string = '';
  status: string = 'In Progress'; // يمكنك تغيير الحالة الافتراضية حسب الحاجة
  attachedFile!: File;
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
      this.attachedFile = input.files[0];
      this.filePreviewUrl = this.attachedFile.name;
      console.log('Selected file:', this.attachedFile);
    }
  }
  submitTask(): void {
    const file = this.attachedFile;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64File = reader.result as string;
        console.log('Base64 File:', base64File);
        const formData = new FormData();
        formData.append('TaskName', this.taskName);
        formData.append('StartDate', this.startDate);
        formData.append('Deadline', this.deadline);
        formData.append('Description', this.description);
        formData.append('Category', this.category);
        formData.append('Status', this.status);
        formData.append('AttachedFile', base64File);
        console.log('Task FormData:', formData);
        const taskObject: any = {};
        formData.forEach((value, key) => {
          taskObject[key] = value;
        });
        console.log('Task Object:', taskObject);
        this.tasks.push(taskObject);
        localStorage.setItem('taskData', JSON.stringify(this.tasks));
        this.taskService.upadateTask(this.tasks);
        this.toastrService.success("تمت إضافة المهمة بنجاح", "نجاح");
        this.closeModal();
        this.taskName = '';
        this.startDate = '';
        this.deadline = '';
        this.description = '';
        this.category = '';
        this.status = '';


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
    this.toastrService.success("تم حذف المهمة بنجاح", "نجاح");
    this.updateCounters();
  }
  updateCounters(): void {
  this.Ncompleted = 0;
  this.NinProgress = 0;
  this.Npending = 0;

  for (let task of this.tasks) {
    if (task.Status === 'Completed') {
      this.Ncompleted++;
    } else if (task.Status === 'In Progress') {
      this.NinProgress++;
    } else {
      this.Npending++;
    }
  }
}
  ngOnInit(): void {
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
