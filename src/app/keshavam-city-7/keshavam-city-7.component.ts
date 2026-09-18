import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SafeUrlPipe } from '../safe-url.pipe';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-keshavam-city-7',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, SafeUrlPipe],
  templateUrl: './keshavam-city-7.component.html',
  styleUrls: ['./keshavam-city-7.component.css']
})
export class KeshavamCity7Component implements OnInit {
  vimeoUrl: string = '';

  ngOnInit(): void {
    const videoId = 'ltuXnRVPRlo';
    this.vimeoUrl = `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&loop=1&playlist=${videoId}`;
  }
}
