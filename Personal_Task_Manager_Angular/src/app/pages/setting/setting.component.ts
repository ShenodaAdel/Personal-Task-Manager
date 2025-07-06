import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../core/interface/i-user';
import { UserServiceService } from '../../core/service/userService/user.service';


@Component({
  selector: 'app-setting',
  imports: [FormsModule, RouterLink],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent implements OnInit {

  private readonly toastrService = inject(ToastrService);
  private readonly router = inject(Router);
  private readonly userService = inject(UserServiceService);

  user: User = new User();

  uploaded_file!: File;
  imagePreview: string = '';


  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploaded_file = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.uploaded_file);
    }
  }


  saveProfile(): void {
    console.log('saveProfile clicked');
    const file = this.uploaded_file;
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
       (this.user as any).image = reader.result as string;
        console.log('Base64 File:', (this.user as any).image);
        const formData = new FormData();
        formData.append('User', JSON.stringify(this.user)); 

        console.log('FormData Sent:', formData);
        localStorage.setItem('UserLogin', JSON.stringify(this.user));
        this.userService.updateUser(this.user);
        this.toastrService.success('Profile updated successfully', 'Success');
        this.router.navigate(['/profile']);
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        this.toastrService.error('Failed to upload file', 'Error');
      };
    } 
    else {
      localStorage.setItem('UserLogin', JSON.stringify(this.user));
      this.toastrService.success('Profile updated successfully ', 'Success');
      this.router.navigate(['/profile']);
    }
  }


  ngOnInit(): void {
    const storedUser = localStorage.getItem('UserLogin');
    console.log('Stored User Data:', storedUser);
    if (storedUser) {
      this.user = JSON.parse(storedUser);
    }
  }
}
