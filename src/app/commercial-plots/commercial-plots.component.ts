import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-commercial-plots',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './commercial-plots.component.html',
  styleUrl: './commercial-plots.component.css'
})
export class CommercialPlotsComponent implements OnInit {
  cards = [
    {
      id: 'plots-in-nagpur',
      title: 'Commercial Plots in Nagpur',
      badge: 'High Growth Corridor',
      subtitle: 'Strategically located commercial land near MIHAN, Bhandara Road & Samruddhi Highway.',
      description: 'Ideal land for expanding businesses, warehouses, factories, office spaces, showrooms, and long-term commercial investment in Central India.',
      image: 'assets/images/image/Keshavam-City-7-View-2.jpg',
      route: '/location/plots-in-nagpur',
      tags: ['MIHAN Hub', 'Bhandara Road', 'Samruddhi Expressway', 'RERA Approved']
    },
    {
      id: 'warehouses-in-nagpur',
      title: 'Commercial Plot for Warehouses in Nagpur',
      badge: 'Logistics & Warehousing',
      subtitle: 'Prime land for warehouses, logistics hubs, and distribution centres.',
      description: 'Evaluate strategic location, heavy truck access, wide approach roads, plot configurations, and land-use permissions suited for logistics efficiency.',
      image: 'assets/images/image/carousel-2.jpg',
      route: '/location/warehouses-in-nagpur',
      tags: ['Wide Approach Roads', 'Truck Movement', 'Logistics Hub', 'Central Distribution']
    }
  ];

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Commercial Plots in Nagpur | Prime Commercial Land & Warehousing');
    this.metaService.updateTag({
      name: 'description',
      content: 'Explore commercial plots in Nagpur for warehouses, factories, offices, and investment. Strategic locations near MIHAN, Bhandara Road & Samruddhi Highway.'
    });
  }
}
