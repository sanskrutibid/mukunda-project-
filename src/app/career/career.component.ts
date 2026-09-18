import { CommonModule } from '@angular/common';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, Title } from '@angular/platform-browser';
import emailjs from '@emailjs/browser';

@Component({
  selector: 'app-career',
  imports:[FormsModule,CommonModule],
  templateUrl: './career.component.html',
  styleUrls: ['./career.component.css'],
})
export class CareerComponent {
  @ViewChild('applyFormElementRef') applyFormElement!: ElementRef<HTMLFormElement>;

  jobOpenings = [
    {
      title: 'Telecaller',
      location: 'Nagpur',
      type: 'Full Time',
      description:
        'Engage with potential buyers through outbound calls, share property details, schedule site visits, and maintain client communication records. Real estate background preferred.',
    },
    {
      title: 'Sales Executive',
      location: 'Nagpur',
      type: 'Full Time',
      description:
        'Generate leads, conduct property site visits, build and maintain customer relationships, and close real estate deals. Must have knowledge of local property market.',
    },
  ];

  jobOpeningsGrouped: any[][] = [];
  selectedJob: any = null;
  resumeFileSelected = false;
  selectedFile: File | null = null;

  applicationData = {
    name: '',
    email: '',
    phone: '',
    dob: '',
    company: '',
    experience: '',
    message: '',
    // resume: ''
  };
    constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}
  

  ngOnInit(): void {
    this.titleService.setTitle('Buy Commercial Plot in Central India | Enquire Now');

this.metaService.updateTag({
  name: 'description',
  content: 'Discover the best commercial plot in Central India with Mukunda Infraventures. Invest smart, explore prime locations, and book your visit today!'
});

    this.groupJobs();
  }

  groupJobs(): void {
    for (let i = 0; i < this.jobOpenings.length; i += 3) {
      this.jobOpeningsGrouped.push(this.jobOpenings.slice(i, i + 3));
    }
  }

  selectJob(job: any): void {
    this.selectedJob = this.selectedJob === job ? null : job;
    this.applicationData = {
      name: '',
      email: '',
      phone: '',
      dob: '',
      company: '',
      experience: '',
      message: '',
      // resume: ''
    };
    this.resumeFileSelected = false;
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      this.selectedFile = input.files[0];
      this.resumeFileSelected = true;
    } else {
      this.selectedFile = null;
      this.resumeFileSelected = false;
    }
  }

  submitApplication() {
    // if (!this.resumeFileSelected) {
    //   alert('Please upload your resume.');
    //   return;
    // }

    const serviceID = 'service_johtzyq';
    const careerTemplateID = 'template_ehivrcl';
    const careerAutoReplyTemplateID = 'template_3mayeea';
    const publicKey = 'OWkMBoQPKQpaoDOY-';


    
    emailjs
      .sendForm(serviceID, careerTemplateID, this.applyFormElement.nativeElement, publicKey)
      .then(() => {
        return emailjs.send(
          serviceID,
          careerAutoReplyTemplateID,
          {
            name: this.applicationData.name,
            email: this.applicationData.email,

            title: 'Thank you for applying with us!',
            message: 'Application Submitted.',
          },
          publicKey
        );
      })
      .then(() => {
        alert('Your application has been submitted.');
        this.resetForm();
      })
      .catch((error) => {
        console.error('Email sending failed:', error);
        alert('Oops! Something went wrong. Please try again later.');
      });
  }

  resetForm() {
    this.applicationData = {
      name: '',
      email: '',
      phone: '',
      dob: '',
      company: '',
      experience: '',
      message: '',
      // resume: ''
    };
    this.selectedFile = null;
    this.resumeFileSelected = false;
    this.selectedJob = null;
  }
}
