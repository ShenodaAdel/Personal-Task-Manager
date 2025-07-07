import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../core/interface/CTasks';
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
  task: Task = new Task();
  isUpdateOpen = false;
  filePreviewUrl: string = '';
  AllTasks: Task[] = [];
  id!: string | null;




  onFileChange(e: Event): void {
    const input = e.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.task.upload_file = input.files[0];
      this.filePreviewUrl = this.task.upload_file.name;
      console.log('Selected file:', this.task.upload_file);
    }
  }

  submitTask(): void {
    if (this.task.upload_file) {
      const reader = new FileReader();
      reader.readAsDataURL(this.task.upload_file);
      reader.onload = () => {
        (this.task as any).upload_file = reader.result as string;
        this.updateTask(this.task);
      };
      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        this.toastrService.error('Failed to upload file', 'Error');
      };
    } else {
      this.task.upload_file = this.AllTasks[Number(this.id)]?.upload_file || '';
      this.updateTask(this.task);
    }
  }

  updateTask(taskObject: Task): void {
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
          this.task = task;
        }
      }
    });
  }


}
