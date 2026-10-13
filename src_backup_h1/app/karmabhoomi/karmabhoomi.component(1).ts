import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from '../safe-url.pipe';
import { DomSanitizer, Meta, Title } from '@angular/platform-browser';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import emailjs from '@emailjs/browser';
import { GoogleMapsModule } from '@angular/google-maps';


@Component({
  selector: 'app-karmabhoomi',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SafeUrlPipe,FontAwesomeModule,GoogleMapsModule],
  templateUrl: './karmabhoomi.component.html',
  styleUrl: './karmabhoomi.component.css'
})

export class KarmabhoomiComponent implements OnInit {
  vimeoUrl: string = '';
  faCircleCheck = faCircleCheck;
  selectedProject: string = '';

  amenities: string[] = [
    '24x7 Security with CCTV Surveillance',
    'Wide RCC Roads for Heavy Vehicle Movement',
    'Uninterrupted Power Supply with Transformer Support',
    'Ample Water Supply and Borewell Access',
    'Rainwater Harvesting and Drainage System',
    'Parking Spaces for Trucks and Commercial Vehicles',
    'Fire Safety Systems & Emergency Response',
    'Green Zones and Plantation for Eco-Friendly Ambience',
    'Industrial Sheds and Plots with Ready Possession',
    'High-Speed Internet & Communication Lines',
    'Easy Access to Highways, Railway & Airport'
  ];

    constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

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
        business:formData.get('business'),
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
  

  ngOnInit(): void {
    this.titleService.setTitle('Commercial Land for Sale in Nagpur | Mukunda Infraventures');

this.metaService.updateTag({
  name: 'description',
  content: 'Explore premium commercial land for sale in Nagpur by Mukunda Infraventures. Discover ongoing projects, prime locations, and book your site visit today.'
});

    const videoId = 'ltuXnRVPRlo';
    this.vimeoUrl = `assets/vedio/Karma_Bhoomi.mp4`;
  }
}
