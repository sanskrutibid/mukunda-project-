import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-about',
  templateUrl: './about-editor.component.html', 
  imports: [FormsModule, CommonModule],
})
export class AboutEditorComponent implements OnInit {
 
  //about Section
  aboutText: string = '';
  selectedImage: string | ArrayBuffer | null = null;

  onTextChange(event: any) {
    this.aboutText = event.target.value;
    localStorage.setItem('aboutText', this.aboutText);
  }

  compressImage(file: File, quality = 0.6): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL('image/jpeg', quality); // Compress image
          resolve(dataUrl);
        };
        img.src = event.target?.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.compressImage(file).then(compressedBase64 => {
        localStorage.setItem('aboutImage', compressedBase64);
        this.selectedImage = compressedBase64;
      });
    }
  }
  save() {
    localStorage.setItem('aboutText', this.aboutText);
    alert('About section updated successfully!');
  }

  ngOnInit(): void {
    this.aboutText = localStorage.getItem('aboutText') || '';
    this.selectedImage = localStorage.getItem('aboutImage');
  }
}
