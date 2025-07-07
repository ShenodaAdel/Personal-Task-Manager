import { Data } from "@angular/router";

export class Task {
  task_name: string = '';
  start_date: string = '';
  deadline: string = '';
  description: string = '';
  category: string = '';
  status: string = '';
  upload_file!: File ; 
}
