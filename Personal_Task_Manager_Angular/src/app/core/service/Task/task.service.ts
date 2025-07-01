import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor() { }
  private taskSource = new BehaviorSubject<any>(null);
  task$=this.taskSource.asObservable();

  upadateTask(data:any){
    this.taskSource.next(data);

  }
  getTask(){
    return this.taskSource.getValue();
  }
  
}
