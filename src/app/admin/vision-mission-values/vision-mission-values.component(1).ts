import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-vision-mission-values',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './vision-mission-values.component.html',
  styleUrls: ['./vision-mission-values.component.css']
})
export class VisionMissionValuesComponent implements OnInit {
  //vision Section
  visionTitle:string='';
  visionText: string = '';
  selectedImage: string | ArrayBuffer | null = null;

  missionText: string = '';
missionTitle: string = '';
selectedMissionImage: string = '';

valuesText: string = '';
valuesTitle: string = '';
selectedValueImage: string = '';


  onTextChange(event: any) {
    this.visionText = event.target.value;
    localStorage.setItem('visionText', this.visionText);
  }

  onTitleChange(event: any) {
    this.visionTitle = event.target.value;
    localStorage.setItem('visionTitle', this.visionTitle);
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
        localStorage.setItem('visionImage', compressedBase64);
        this.selectedImage = compressedBase64;
      });
    }
  }
  saveVision() {
    localStorage.setItem('visionText', this.visionText);
    localStorage.setItem('visionTitle', this.visionTitle);
    alert('About section updated successfully!');
  }

  //mission section
onMissionTextChange(event: any) {
  this.missionText = event.target.value;
  localStorage.setItem('missionText', this.missionText);
}

onMissionTitleChange(event: any) {
  this.missionTitle = event.target.value;
  localStorage.setItem('missionTitle', this.missionTitle);
}

onFileMissionSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.compressImage(file).then(compressedBase64 => {
      localStorage.setItem('missionImage', compressedBase64);
      this.selectedMissionImage = compressedBase64;
    });
  }
}

// Save all mission data
saveMission() {
  localStorage.setItem('missionText', this.missionText);
  localStorage.setItem('missionTitle', this.missionTitle);
  alert('Mission section updated successfully!');
}

 //Values section
 onValueTextChange(event: any) {
  this.valuesText = event.target.value;
  localStorage.setItem('valuesText', this.valuesText);
}

onValueTitleChange(event: any) {
  this.valuesTitle = event.target.value;
  localStorage.setItem('valuesTitle', this.valuesTitle);
}

onFileValueSelected(event: any) {
  const file = event.target.files[0];
  if (file) {
    this.compressImage(file).then(compressedBase64 => {
      localStorage.setItem('selectedValueImage', compressedBase64);
      this.selectedValueImage = compressedBase64;
    });
  }
}

// Save all mission data
saveValue() {
  localStorage.setItem('valuesText', this.valuesText);
  localStorage.setItem('valuesTitle', this.valuesTitle);
  alert('Mission section updated successfully!');
}




  ngOnInit(): void {
    //vision section
    this.visionTitle = localStorage.getItem('visionTitle') || '';
    this.visionText = localStorage.getItem('visionText') || '';
    this.selectedImage = localStorage.getItem('visionImage');

  //mission section
  this.missionTitle = localStorage.getItem('missionTitle') || '';
    this.missionText = localStorage.getItem('missionText') || '';
    this.selectedMissionImage = localStorage.getItem('selectedMissionImage') || '';

    //Values section
  this.valuesTitle = localStorage.getItem('valuesTitle') || '';
  this.valuesText = localStorage.getItem('valuesText') || '';
  this.selectedValueImage = localStorage.getItem('selectedValueImage') || '';

  }
}
