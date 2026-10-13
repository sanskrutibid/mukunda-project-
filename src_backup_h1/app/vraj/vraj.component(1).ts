import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from '../safe-url.pipe';
import { DomSanitizer } from '@angular/platform-browser';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-vraj',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SafeUrlPipe,FontAwesomeModule],
  templateUrl: './vraj.component.html',
  styleUrl: './vraj.component.css'
})
export class VrajComponent implements OnInit {
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

    'Dedicated Parking Zones',

    ' Vastu-Compliant Plot Layout',

    ' Stormwater Drainage System',

    ' Solar-Powered Street Lights (eco-friendly appeal)',

    'Plots Marked with Individual Plot Numbers & Boundary Stones'
  ];

  sendEmail(event: Event) {
    event.preventDefault(); // Prevent default form submit
  
    // EmailJS configuration
    const serviceID = 'service_r636te7';
    const templateID = 'template_gy5dlib';
    

    const publicKey = '642oKZ8s5x1B-sEST';
  
    // Send the form using emailjs.sendForm
    emailjs.sendForm(serviceID, templateID, event.target as HTMLFormElement, publicKey)
      .then((result: any) => {
        console.log('SUCCESS!', result.text);
        alert('Your enquiry has been sent!');
        (event.target as HTMLFormElement).reset();
      }, (error: any) => {
        console.error('FAILED...', error);
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
    this.vimeoUrl = `assets/vedio/Vraj.mp4`;
  }
}
