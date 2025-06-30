import { Component, inject, OnChanges, OnInit } from '@angular/core';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { NavbarComponent } from "../navbar/navbar.component";

import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { ITask } from '../../interface/itasks';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [SidebarComponent, NavbarComponent, NgIf, FormsModule ,RouterLink],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent  implements OnInit {
private readonly toastrService=inject(ToastrService);
isOpen: boolean = false;
tasks: ITask[] = []; 
ngOnInit(): void {
  this.tasks = JSON.parse(localStorage.getItem('taskData') || '[]');
  console.log('Tasks from localStorage:', this.tasks);
}


openModal(): void {
  this.isOpen = true;
}
closeModal(): void {
  this.isOpen = false;
}
taskName: string = '';
startDate: string = '';
deadline: string = '';
description: string = '';
category: string = '';
attachedFile!: File;
filePreviewUrl: string = ''; // لو حابة تعرضي اسم الملف أو تفاصيله

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
        formData.append('AttachedFile', base64File);
        console.log('Task FormData:', formData);
        const taskObject: any = {};
        formData.forEach((value, key) => {
          taskObject[key] = value;
        });
        console.log('Task Object:', taskObject);
        this.tasks.push(taskObject);
        localStorage.setItem('taskData', JSON.stringify(this.tasks));
        this.toastrService.success("تمت إضافة المهمة بنجاح", "نجاح");
        this.closeModal();
        this.taskName = '';
        this.startDate = '';
        this.deadline = '';
        this.description = '';
        this.category = '';
 

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
  }

}
