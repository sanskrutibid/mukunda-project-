import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
})
export class ContactUsComponent implements OnInit {

  constructor(
  private titleService: Title,
  private metaService: Meta
) {}


  ngOnInit(): void {
   this.titleService.setTitle('Leading Property Developer in Nagpur | Mukunda Infraventures');

this.metaService.updateTag({
  name: 'description',
  content: 'Looking for a leading property developer in Nagpur? Mukunda Infraventures offers premium residential and commercial plots in prime locations. Contact us today!'
});
  }

  //  name: string = '';
  // email: string = '';
  // phone: string = '';
  // project: string = '';
  // message: string = '';

  // constructor(private http: HttpClient) {}

  // sendEmail() {

  //   this.http.post('http://localhost:3000/send-enquiry', {
  //     name: this.name,
  //     email: this.email,
  //     phone: this.phone,
  //     project: this.project,
  //     message: this.message
  //   }).subscribe({
  //     next: () => {
  //       alert('Enquiry sent!');

  //       this.name = '';
  //       this.email = '';
  //       this.phone = '';
  //       this.project = '';
  //       this.message = '';
  //     },
  //     error: () => alert('Failed to send enquiry.')
  //   });
  // }


  sendEmail(event: Event) {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const serviceID = 'service_johtzyq';
    const enquiryTemplateID = 'template_ehivrcl';
    const autoReplyTemplateID = 'template_3mayeea';
    const publicKey = 'OWkMBoQPKQpaoDOY-';

    emailjs.sendForm(serviceID, enquiryTemplateID, form, publicKey)
      .then(() => {
        console.log('Enquiry email sent');
        return emailjs.send(serviceID, autoReplyTemplateID, {
          name: formData.get('name'),
          email: formData.get('email'),
          project: formData.get('project'),
          message: formData.get('message'),
          title: `Enquiry for project ${formData.get('project')}`
        }, publicKey);
      })
      .then(() => {
        alert('Your enquiry has been sent! A confirmation email has also been sent to you.');
        form.reset();
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        alert('Oops! Something went wrong. Please try again later.');
      });
  }

  sendOnWhatsApp(form: NgForm) {
    const name = (document.getElementById('name') as HTMLInputElement)?.value;
    const email = (document.getElementById('email') as HTMLInputElement)?.value;
    const phone = (document.getElementById('phone') as HTMLInputElement)?.value;
    const project = (document.getElementById('project') as HTMLSelectElement)?.value;
    const message = (document.getElementById('message') as HTMLTextAreaElement)?.value;

    if (!name || !email || !phone || !project || !message) {
      alert("Please fill in all fields before sending on WhatsApp.");
      return;
    }

    const whatsappNumber = "918956944848"; // ✅ Replace with your WhatsApp number (with country code)
    const encodedMsg = encodeURIComponent(
      `New Project Enquiry:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nProject: ${project}\nMessage: ${message}`
    );

    window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, '_blank');

    form.resetForm();

    alert("Your enquiry has been prepared for WhatsApp. Please send it from the WhatsApp tab.");
  }



}





