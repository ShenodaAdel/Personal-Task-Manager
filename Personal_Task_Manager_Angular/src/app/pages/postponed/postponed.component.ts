import { DatePipe, isPlatformBrowser } from '@angular/common';
import { Component, inject, PLATFORM_ID } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Task } from '../../core/interface/CTasks';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-postponed',
  imports: [DatePipe,RouterLink],
  templateUrl: './postponed.component.html',
  styleUrl: './postponed.component.css'
})
export class PostponedComponent {
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
  this.toastrService.success("تم حذف المهمة بنجاح", "نجاح");

}

  ngOnInit():void{
    if (isPlatformBrowser(this.platformId)) {
         this.allTask = JSON.parse(localStorage.getItem('taskData') || '[]');
    }
    console.log(this.allTask);
    for (let i=0 ; i< this.allTask.length ;i++ ) {
      if (this.allTask[i].status === 'Pending') {
        this.taskCompleted.push({ task: this.allTask[i], index: i });
      }
    }
   console.log(this.taskCompleted);
  }

}
