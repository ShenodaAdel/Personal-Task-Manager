import { Component, inject, Inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import emailjs from '@emailjs/browser'
import { HelpService } from '../../core/service/help/help.service';
@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.css'
})
export class ContactUsComponent {
  private readonly toastrService = inject(ToastrService);
  private readonly helpService=inject(HelpService);


  contactForm: FormGroup = new FormGroup({
    user_name: new FormControl(null, [Validators.required, Validators.minLength(3)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    country_code: new FormControl('+20', [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern('^[0-9]{11}$')
    ]),
    problem: new FormControl(null, [Validators.required, Validators.minLength(10)]),
  });
  allHelp: any[] = [];

  submitForm() {
    if (this.contactForm.valid) {
  
      console.log('Form Submitted ', this.contactForm.value);


      let stored = localStorage.getItem('help');
      let parsed: any = [];

      if (stored) {
        try {
          const temp = JSON.parse(stored);
          parsed = Array.isArray(temp) ? temp : [temp]; // نحول لـ array لو مش
        } catch (e) {
          console.error('Error parsing localStorage:', e);
          parsed = [];
        }
      }

      const helpObject: any = { ...this.contactForm.value };

      parsed.push(helpObject);

      localStorage.setItem('help', JSON.stringify(parsed));
      this.helpService.updateHelp(parsed)



      emailjs
        .send('service_pq51gob', 'template_kx3f8cv', this.contactForm.value, 's8Iu6q6YchL-9IXib')
        .then(() => {
          this.toastrService.success('تم إرسال الرسالة بنجاح');
          this.contactForm.reset();
        })
        .catch((error) => {
          console.error('Email error:', error);
          this.toastrService.error('حدث خطأ أثناء الإرسال');
        });
      this.contactForm.reset();
      this.toastrService.success('Message sent!', 'Success');
    } else {
      console.log(' Form is invalid');
    }
  }
}
