import { Injectable } from '@angular/core';
import { CarouselImage } from './image.model';

@Injectable({ providedIn: 'root' })
export class ImageService {
  private storageKey = 'carouselImages';

  getImages(): CarouselImage[] {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : this.getDefaultImages();
  }

  saveImages(images: CarouselImage[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(images));
  }

  private getDefaultImages(): CarouselImage[] {
    return [
      { id: 1, url: 'assets/images/image/carousel-1.jpg' },
      { id: 2, url: 'assets/images/image/carousel-2.jpg' },
      { id: 3, url: 'assets/images/image/carousel-3.jpg' }
    ];
  }
}
