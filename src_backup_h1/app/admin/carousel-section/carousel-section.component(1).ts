import { Component, OnInit } from '@angular/core';
import { CarouselImage } from '../image.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ImageService } from '../image.service';

@Component({
  selector: 'app-carousel-section',
  imports: [CommonModule,FormsModule],
  templateUrl: './carousel-section.component.html',
  styleUrl: './carousel-section.component.css'
})
export class CarouselSectionComponent implements OnInit {
 // admin-carousel.component.ts
 carouselImages: CarouselImage[] = [];
 

 constructor(private imageservice:ImageService) {}

 ngOnInit() {
   this.carouselImages = this.imageservice.getImages();
 }

 resizeImage(file: File, maxWidth = 800, maxHeight = 600): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e: any) => {
      img.src = e.target.result;

      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;

        if (width > maxWidth || height > maxHeight) {
          if (width / height > maxWidth / maxHeight) {
            width = maxWidth;
            height = (img.height * maxWidth) / img.width;
          } else {
            height = maxHeight;
            width = (img.width * maxHeight) / img.height;
          }
        }

        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        const resizedBase64 = canvas.toDataURL('image/jpeg', 0.7); // 70% quality
        resolve(resizedBase64);
      };

      img.onerror = () => reject('Image load error');
    };

    reader.onerror = () => reject('File read error');
    reader.readAsDataURL(file);
  });
}


 
async onFileSelected(event: any, index: number) {
  const file = event.target.files[0];
  if (file) {
    try {
      const resizedImage = await this.resizeImage(file);
      this.carouselImages[index].url = resizedImage;
    } catch (error) {
      console.error('Image resize failed', error);
    }
  }
}


 deleteImage(index: number) {
   this.carouselImages.splice(index, 1);
   this.imageservice.saveImages(this.carouselImages);
 }

 addImage(event: any) {
   const file = event.target.files[0];
   if (file) {
     const reader = new FileReader();
     reader.onload = () => {
       const newImage: CarouselImage = {
         id: Date.now(),
         url: reader.result as string
       };
       this.carouselImages.push(newImage);
       this.imageservice.saveImages(this.carouselImages);
     };
     reader.readAsDataURL(file);
   }
 }
 saveImage() {
  try {
    localStorage.setItem('carouselImages', JSON.stringify(this.carouselImages));
    alert('Carousel images saved!');
  } catch (e) {
    console.error('Storage limit exceeded:', e);
    alert('Image size too large. Try uploading smaller images.');
  }
}

}