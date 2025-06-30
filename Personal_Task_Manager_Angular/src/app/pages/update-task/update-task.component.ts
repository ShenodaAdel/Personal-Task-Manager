import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ITask } from '../../interface/itasks';

@Component({
  selector: 'app-update-task',
  imports: [FormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent {
private readonly toastrService=inject(ToastrService);
  private readonly activatedRoute=inject(ActivatedRoute);
isUpdateOpen = false;
taskName: string = '';
startDate: string = '';
deadline: string = '';
description: string = '';
category: string = '';
status: string = 'Pending';
attachedFile!: File;
filePreviewUrl: string = '';

AllTasks: ITask[] = [];
id!: string | null;
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
  const taskObject: any = {};
        formData.forEach((value, key) => {
          taskObject[key] = value;
        });
        console.log('Task Object:', taskObject);
        this.AllTasks[Number(this.id)] = taskObject;
        localStorage.setItem('taskData', JSON.stringify(this.AllTasks));
        this.toastrService.success("تمت تعديل المهمة بنجاح", "نجاح");
        formData.delete;
}

  ngOnInit(): void {
  this.AllTasks=JSON.parse(localStorage.getItem('taskData') || '[]');
  this.activatedRoute.paramMap.subscribe({
    next:(res)=>{
       this.id = res.get("id");
      const task = this.AllTasks[Number(this.id)];
      this.taskName = task.TaskName;
      this.startDate = task.StartDate;  
      this.deadline = task.Deadline;
      this.description = task.Description;
      this.category = task.Category;
    }
  });

}

}
