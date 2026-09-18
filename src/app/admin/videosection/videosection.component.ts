import { Component, OnInit } from '@angular/core';
import { SafeUrlPipe } from '../../safe-url.pipe';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-videosection',
  imports: [SafeUrlPipe,CommonModule,FormsModule],
  templateUrl: './videosection.component.html',
  styleUrl: './videosection.component.css'
})
export class VideosectionComponent implements OnInit {

  videoUrl: string = '';
previewUrl: string = '';

ngOnInit(): void {
  const storedUrl = localStorage.getItem('vimeoVideoUrl');
  if (storedUrl) {
    this.videoUrl = storedUrl;
    this.previewUrl = storedUrl;
  }
}

onVideoUrlChange(event: any) {
  this.videoUrl = event.target.value;
}

saveVideoUrl() {
  localStorage.setItem('vimeoVideoUrl', this.videoUrl);
  this.previewUrl = this.videoUrl;
  alert('Vimeo video URL saved successfully!');
}

}
