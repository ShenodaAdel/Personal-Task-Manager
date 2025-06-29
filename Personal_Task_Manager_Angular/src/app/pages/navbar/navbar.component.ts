import { NgIf } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  imports: [ NgIf,RouterLink,FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  private readonly toastrService=inject(ToastrService);
isOpen: boolean = false;

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
  const formData = new FormData();
  formData.append('TaskName', this.taskName);
  formData.append('StartDate', this.startDate);
  formData.append('Deadline', this.deadline);
  formData.append('Description', this.description);
  formData.append('Category', this.category);
  formData.append('AttachedFile', this.attachedFile);


  console.log('Task FormData:', formData);
  this.isOpen = false;
          formData.delete;

  this.toastrService.success("تمت إضافة المهمة بنجاح", "نجاح");


}
}
