import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faRulerCombined, faStar, faMapMarkerAlt, faIndustry } from '@fortawesome/free-solid-svg-icons';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-projectdetail',
  imports: [CommonModule,RouterModule, FontAwesomeModule],
  templateUrl: './projectdetail.component.html',
  styleUrl: './projectdetail.component.css'
})
export class ProjectdetailComponent {
  faRulerCombined = faRulerCombined;  // for Acres
  faStar = faStar;                    // for Amenities
  faMapMarkerAlt = faMapMarkerAlt;
  faIndustry = faIndustry;
  faArrowRight = faArrowRight;

}
