import { isPlatformBrowser, NgIf } from '@angular/common';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ITask } from '../../core/interface/itasks';
import { User } from '../../core/interface/i-user';
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
  tasks: ITask[] = [];
  user: User = new User();




  taskName: string = '';
  startDate: string = '';
  deadline: string = '';
  description: string = '';
  category: string = '';
  attachedFile!: File;
  status: string = '';
  filePreviewUrl: string = ''; // لو حابة تعرضي اسم الملف أو تفاصيله
  numberNotification: any[] = [];
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
}




