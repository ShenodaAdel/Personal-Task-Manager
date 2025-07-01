import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ITask } from '../../core/interface/itasks';
import { Router } from '@angular/router';
@Component({
  selector: 'app-update-task',
  imports: [FormsModule],
  templateUrl: './update-task.component.html',
  styleUrl: './update-task.component.css'
})
export class UpdateTaskComponent {
  private readonly toastrService = inject(ToastrService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly router = inject(Router);
  isUpdateOpen = false;
  taskName: string = '';
  startDate: string = '';
  deadline: string = '';
  description: string = '';
  category: string = '';
  status: string = '';
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
  const taskObject: any = {
    TaskName: this.taskName,
    StartDate: this.startDate,
    Deadline: this.deadline,
    Description: this.description,
    Category: this.category,
    Status: this.status,
    AttachedFile: '' 
  };

  if (this.attachedFile) {
    const reader = new FileReader();
    reader.readAsDataURL(this.attachedFile);
    reader.onload = () => {
      taskObject.AttachedFile = reader.result as string;
      this.updateTask(taskObject);
    };
    reader.onerror = (error) => {
      console.error('Error reading file:', error);
      this.toastrService.error('Failed to upload file', 'Error');
    };
  } else {
    taskObject.AttachedFile = this.AllTasks[Number(this.id)]?.AttachedFile || '';
    this.updateTask(taskObject);
  }
}

updateTask(taskObject: any): void {
  if (this.id !== null) {
    this.AllTasks[Number(this.id)] = taskObject;
    localStorage.setItem('taskData', JSON.stringify(this.AllTasks));
    this.toastrService.success("Task updated successfully", "Success");
    this.router.navigate(['/tasks']);
  } else {
    this.toastrService.error("Invalid task ID", "Error");
  }
}

ngOnInit(): void {
  this.AllTasks = JSON.parse(localStorage.getItem('taskData') || '[]');
  this.activatedRoute.paramMap.subscribe({
    next: (res) => {
      this.id = res.get("id");
      const task = this.AllTasks[Number(this.id)];
      if (task) {
        this.taskName = task.TaskName;
        this.startDate = task.StartDate;
        this.deadline = task.Deadline;
        this.status = task.Status;
        this.description = task.Description;
        this.category = task.Category;
        this.filePreviewUrl = task.AttachedFile || '';
      }
    }
  });
}


  }
