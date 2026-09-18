import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-slider-section',
  imports: [CommonModule,FormsModule],
  templateUrl: './slider-section.component.html',
  styleUrl: './slider-section.component.css'
})
export class SliderSectionComponent implements OnInit {
  sliderDelay: number = 3000; // Default value

  ngOnInit() {
    const savedDelay = localStorage.getItem('sliderDelay');
    if (savedDelay) {
      this.sliderDelay = +savedDelay;
    }
  }

  saveSliderDelay() {
    localStorage.setItem('sliderDelay', this.sliderDelay.toString());
    alert('Slider delay updated!');
  }
}
