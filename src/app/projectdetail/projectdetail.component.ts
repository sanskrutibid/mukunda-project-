import { CommonModule } from '@angular/common';

import { Component, OnInit } from '@angular/core';

import { RouterModule } from '@angular/router';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { faRulerCombined, faStar, faMapMarkerAlt, faIndustry } from '@fortawesome/free-solid-svg-icons';

import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import { Meta, Title } from '@angular/platform-browser';

@Component({

  selector: 'app-projectdetail',

  imports: [CommonModule, RouterModule, FontAwesomeModule],

  templateUrl: './projectdetail.component.html',

  styleUrl: './projectdetail.component.css'

})

export class ProjectdetailComponent implements OnInit {

  faRulerCombined = faRulerCombined;  // for Acres

  faStar = faStar;                    // for Amenities

  faMapMarkerAlt = faMapMarkerAlt;

  faIndustry = faIndustry;

  faArrowRight = faArrowRight;


  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}


  ngOnInit(): void {

    this.titleService.setTitle(
      'Upcoming & Ongoing Projects in Nagpur | Mukunda Infraventures'
    );

    this.metaService.updateTag({
      name: 'description',
      content:
        'View Mukunda Infraventures projects across Nagpur and learn about locations, development plans and property opportunities suited to different investment needs.'
    });

  }

}