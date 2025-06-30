import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  private readonly toastrService = inject(ToastrService);

 
 contactForm: FormGroup = new FormGroup({
    first_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country_code: new FormControl('+20', [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]{11}$')
    ]),
    message: new FormControl(null, [Validators.required, Validators.minLength(10)]),
  });

  submitForm() {
    if (this.contactForm.valid) {
      console.log('Form Submitted ', this.contactForm.value);
      this.contactForm.reset();
      this.toastrService.success('Message sent!', 'Success');
    } else {
      console.log(' Form is invalid');
    }
  }
}
