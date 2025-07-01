import { Component, inject, OnInit } from '@angular/core';
import { ITask } from '../../core/interface/itasks';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-completed',
  imports: [DatePipe,RouterLink],
  templateUrl: './completed.component.html',
  styleUrl: './completed.component.css'
})
export class CompletedComponent  implements OnInit{
  private readonly toastrService=inject(ToastrService);
taskCompleted:ITask[]=[];
allTask:ITask[]=[];
  deleteTask(index: number): void {
    console.log('Task deleted at index:', index);
    this.allTask.splice(index, 1);//0
    this.taskCompleted.splice(index,1)//1
    localStorage.setItem('taskData', JSON.stringify(this.allTask));
    console.log('Updated tasks after deletion:', this.allTask);
    this.toastrService.success("تم حذف المهمة بنجاح", "نجاح");
  }

  ngOnInit():void{
    this.allTask =  JSON.parse(localStorage.getItem('taskData') || '[]');
    for (let task of this.allTask) {
      if (task.Status === 'Completed') {
        this.taskCompleted.push(task); //index 
      }
    }
   


  }

}
