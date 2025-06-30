import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ITask } from '../../interface/itasks';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-detail-task',
  imports: [],
  templateUrl: './detail-task.component.html',
  styleUrl: './detail-task.component.css'
})
export class DetailTaskComponent implements OnInit {
private readonly toastrService=inject(ToastrService);
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
    this.toastrService.success("تم حذف المهمة بنجاح", "نجاح");
  }
}
