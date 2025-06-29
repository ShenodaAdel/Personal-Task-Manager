import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-setting',
  imports: [FormsModule,RouterLink],
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {
        private readonly toastrService=inject(ToastrService);

userName: string = 'User name';
email: string = 'mi@xpaytech.co';
phoneNumber: string = '+20-01274318900';
address: string = '285 N Broad St, Elizabeth, NJ 07208, USA';
uploadedFile!: File;
imagePreview: string = 'https://via.placeholder.com/150';

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
  const formData = new FormData();
  formData.append('UserName', this.userName);
  formData.append('Email', this.email);
  formData.append('PhoneNumber', this.phoneNumber);
  formData.append('Address', this.address);
  formData.append('UploadedFile', this.uploadedFile);

  console.log('FormData Sent:', formData);
  this.toastrService.success('Profile updated successfully', 'Success');
}

}
