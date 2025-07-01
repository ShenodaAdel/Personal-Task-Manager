import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ITask } from '../../core/interface/itasks';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-detail-task',
  imports: [DatePipe,RouterLink],
  templateUrl: './detail-task.component.html',
  styleUrl: './detail-task.component.css'
})
export class DetailTaskComponent implements OnInit {
private readonly toastrService=inject(ToastrService);
private readonly router=inject(Router);
  private readonly activatedRoute=inject(ActivatedRoute);
  AllTasks: ITask[] = [];
  task: ITask = {} as ITask;
  id!: string | null;
  ngOnInit(): void {
  this.AllTasks=JSON.parse(localStorage.getItem('taskData') || '[]');
  this.activatedRoute.paramMap.subscribe({
    next:(res)=>{
       this.id = res.get("id");
      this.task = this.AllTasks[Number(this.id)];
      console.log('Task Details:', this.task);
    }
  });

}

deleteTask(): void {
   console.log('Task deleted at index:', this.id);
    this.AllTasks.splice(Number(this.id), 1);
    localStorage.setItem('taskData', JSON.stringify(this.AllTasks));
    console.log('Updated AllTasks after deletion:', this.AllTasks);
    this.toastrService.success("the task has been deleted successfully", "Success");
    this.router.navigate(['/tasks']);
  }
}
