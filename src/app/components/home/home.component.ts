import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactUs } from 'src/app/model/contact-us';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  inquiry: ContactUs = {};


  contactForm = new FormGroup({
    fullName: new FormControl('', [Validators.required],
    ),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  })
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {
    this.inquiry.fullName = this.contactForm.value.fullName!;
    this.inquiry.email = this.contactForm.value.email!;
    this.inquiry.phoneNumber = this.contactForm.value.phoneNumber!;
    this.inquiry.message = this.contactForm.value.message!;

    console.log(this.inquiry);

  }

}
