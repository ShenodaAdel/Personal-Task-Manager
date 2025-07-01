import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  constructor() { }
   private userSource = new BehaviorSubject<any>(null);
  user$ = this.userSource.asObservable();

  updateUser(data: any) {
    this.userSource.next(data);
  }

  getCurrentUser() {
    return this.userSource.getValue();
  }
}
