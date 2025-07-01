import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../core/interface/i-user';
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
  private readonly userService=inject(UserServiceService);

  User: any = {};
  userName: string = '';
  email: string = '';
  phoneNumber: string = '';
  address: string = '';
  uploadedFile!: File;
  imagePreview: string = '';


  onFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result as string;
      };
      reader.readAsDataURL(this.uploadedFile);
    }
  }


  saveProfile(): void {
    console.log('saveProfile clicked');
    const file = this.uploadedFile;

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        const base64File = reader.result as string;
        console.log('Base64 File:', base64File);

        const formData = new FormData();
        formData.append('UserName', this.userName);
        formData.append('Email', this.email);
        formData.append('PhoneNumber', this.phoneNumber);
        formData.append('Address', this.address);
        formData.append('UploadedFile', base64File);

        console.log('FormData Sent:', formData);

        this.User = {
          UserName: this.userName,
          Email: this.email,
          PhoneNumber: this.phoneNumber,
          Address: this.address,
          UploadedFile: base64File
        };

        localStorage.setItem('User', JSON.stringify(this.User));
        this.userService.updateUser(this.User);


        this.toastrService.success('Profile updated successfully', 'Success');
        this.router.navigate(['/profile']);
      };

      reader.onerror = (error) => {
        console.error('Error reading file:', error);
        this.toastrService.error('Failed to upload file', 'Error');
      };
    } else {
      // حالة مفيش فايل
      this.User = {
        UserName: this.userName,
        Email: this.email,
        PhoneNumber: this.phoneNumber,
        Address: this.address,
        UploadedFile: this.imagePreview // الصورة القديمة أو فاضية
      };

      localStorage.setItem('User', JSON.stringify(this.User));
      this.toastrService.success('Profile updated successfully ', 'Success');
      this.router.navigate(['/profile']);
    }
  }


  ngOnInit(): void {
    const storedUser = localStorage.getItem('User');
    console.log('Stored User Data:', storedUser);
    if (storedUser) {
      this.User = JSON.parse(storedUser);
      this.userName = this.User.UserName || '';
      this.email = this.User.Email || '';
      this.phoneNumber = this.User.PhoneNumber || '';
      this.address = this.User.Address || '';
      this.imagePreview = this.User.UploadedFile || '';


    }
  }
}
