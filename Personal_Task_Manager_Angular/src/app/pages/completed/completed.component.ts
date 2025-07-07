import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { Task } from '../../core/interface/CTasks';
import { DatePipe, isPlatformBrowser } from '@angular/common';
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
   private readonly platformId=inject(PLATFORM_ID);
taskCompleted: { task: Task; index: number }[] = [];
allTask:Task[]=[]; //true index
  deleteTask(index: number): void {
    console.log(index);
  const deletedEntry = this.taskCompleted[index];
  const indexInAll = deletedEntry.index;
  this.allTask.splice(indexInAll, 1);
  this.taskCompleted.splice(index, 1);
  localStorage.setItem('taskData', JSON.stringify(this.allTask));
this.toastrService.success("Task deleted successfully", "Success");

}

  ngOnInit():void{
    if (isPlatformBrowser(this.platformId)) {
         this.allTask = JSON.parse(localStorage.getItem('taskData') || '[]');
    }
    console.log(this.allTask);
    for (let i=0 ; i< this.allTask.length ;i++ ) {
      if (this.allTask[i].status === 'Completed') {
        this.taskCompleted.push({ task: this.allTask[i], index: i });
      }
    }
   console.log(this.taskCompleted);
  }

}
