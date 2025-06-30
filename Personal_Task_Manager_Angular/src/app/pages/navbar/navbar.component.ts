import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  imports: [NgIf, RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  private readonly toastrService = inject(ToastrService);
  isOpen: boolean = false;
  tasks: any[] = [];
  ngOnInit(): void {
    this.tasks = JSON.parse(localStorage.getItem('taskData') || '[]');
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
}




