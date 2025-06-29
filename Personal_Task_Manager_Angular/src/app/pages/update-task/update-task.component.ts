import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-task',
  imports: [FormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent {
      private readonly toastrService=inject(ToastrService);
isUpdateOpen = false;

taskName: string = '';
startDate: string = '';
deadline: string = '';
description: string = '';
category: string = '';
status: string = 'Pending';
attachedFile!: File;
filePreviewUrl: string = '';

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
  formData.append('Status', this.status);
  formData.append('AttachedFile', this.attachedFile);

  console.log('Task FormData:', formData);
 formData.delete;
  this.toastrService.success('تمت إضافة المهمة بنجاح', 'نجاح');
}


}
