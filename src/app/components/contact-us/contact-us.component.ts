import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import * as Notiflix from 'notiflix';
import { ContactUs } from 'src/app/model/contact-us';
import { PublicService } from 'src/app/services/public.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  inquiry: ContactUs = {};


  contactForm = new FormGroup({
    fullName: new FormControl('', [Validators.required],
    ),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  })

  constructor(private publicService: PublicService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.inquiry.fullName = this.contactForm.value.fullName!;
    this.inquiry.email = this.contactForm.value.email!;
    this.inquiry.phoneNumber = this.contactForm.value.phoneNumber!;
    this.inquiry.message = this.contactForm.value.message!;

    this.publicService.sendPublicQuery(this.inquiry.fullName, this.inquiry.email,
      this.inquiry.phoneNumber, this.inquiry.message).subscribe({
        next: ((response: boolean) => {
          if (response === true) {
            Notiflix.Notify.success("Your Query was sent successfully, We will response as quickly as possablie.")
          }
        })
      })

  }

}
