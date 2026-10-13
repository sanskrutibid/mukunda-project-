import { Component } from '@angular/core';
import {trigger, transition,style,animate, query, stagger} from '@angular/animations';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sticky-contact',
  imports: [RouterModule, FontAwesomeModule, CommonModule, FormsModule],
  templateUrl: './sticky-contact.component.html',
  styleUrls: ['./sticky-contact.component.css'],
  animations: [
    trigger('fadeInStagger', [
      transition(':enter', [
        query('.icon', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger(150, [
            animate(
              '500ms ease-out',
              style({ opacity: 1, transform: 'translateX(0)' })
            )
          ])
        ])
      ])
    ])
  ]
})
export class StickyContactComponent {
  faWhatsapp = faWhatsapp;
  faPhone = faPhone;
  faEnvelope = faEnvelope;
}

