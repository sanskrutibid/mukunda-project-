import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from '../safe-url.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { faCheck, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-keshavam-city-9',
  imports: [CommonModule, RouterModule, FormsModule, SafeUrlPipe,FontAwesomeModule],
  templateUrl: './keshavam-city-9.component.html',
  styleUrl: './keshavam-city-9.component.css'
})
export class KeshavamCity9Component implements OnInit {
  vimeoUrl: string = '';
  faCircleCheck = faCircleCheck;

  amenities: string[] = [
    'Gated Community with 24/7 Security & CCTV Surveillance',

    'Wide Internal Roads with Street Lighting',

    'Underground Drainage and Sewage System',

    'Water Supply Connection to Each Plot',

    'Electricity with Transformer & Street Poles',

    'Landscape Gardens & Green Zones',

    'Children’s Play Area and Open Spaces',

    'Rainwater Harvesting System',

    'Walking & Jogging Tracks',

    ' Vastu-Compliant Plot Layout',

    ' Stormwater Drainage System',

    ' Solar-Powered Street Lights (eco-friendly appeal)',

    'Plots Marked with Individual Plot Numbers & Boundary Stones'
  ];

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

  // Validation check
  if (!name || !email || !phone || !project || !message) {
    alert("Please fill in all fields before sending on WhatsApp.");
    return;
  }

  const whatsappNumber = "918956944848"; // 🔁 Replace with your WhatsApp number (with country code)
  const encodedMsg = encodeURIComponent(
    `📩 New Enquiry:\n\n👤 Name: ${name}\n📧 Email: ${email}\n📱 Phone: ${phone}\n🏗️ Project: ${project}\n📝 Message: ${message}`
  );

  window.open(`https://wa.me/${whatsappNumber}?text=${encodedMsg}`, '_blank');
   form.resetForm();

  alert("Your enquiry has been prepared for WhatsApp. Please send it from the WhatsApp tab.");
}


  ngOnInit(): void {
    this.vimeoUrl = `assets/vedio/Keshavam-9.mp4`;
  }
}

