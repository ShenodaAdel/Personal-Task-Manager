import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HelpService {

  constructor() { }
     private help = new BehaviorSubject<any>(null);
    helps$ = this.help.asObservable();
  
    updateHelp(data: any) {
      this.help.next(data);
    }
  
    getCurrentHelp() {
      return this.help.getValue();
    }
}
