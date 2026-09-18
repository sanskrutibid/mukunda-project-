import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-commercial-plots-warehouse',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './commercial-plots-warehouse.component.html',
  styleUrl: './commercial-plots-warehouse.component.css'
})
export class CommercialPlotsWarehouseComponent implements OnInit {
  activeFaqIndex: number | null = 0;

  advantages = [
    { icon: 'la-road', title: 'Highway Access', desc: 'Direct & easy access to major national highways and transport expressways.' },
    { icon: 'la-industry', title: 'Industrial Connectivity', desc: 'Strategic proximity to industrial zones and key commercial hubs.' },
    { icon: 'la-truck', title: 'Heavy Vehicle Movement', desc: 'Wide approach roads designed for smooth truck, trailer, and container movement.' },
    { icon: 'la-map-marker-alt', title: 'Market Proximity', desc: 'Close access to major customer bases and regional distribution centers.' },
    { icon: 'la-expand-arrows-alt', title: 'Future Expansion', desc: 'Scalable plot footprints offering room for additional storage & docks.' },
    { icon: 'la-dolly', title: 'Supply Chain Efficiency', desc: 'Seamless logistics operations reducing transit time & transportation costs.' }
  ];

  factors = [
    {
      num: '01',
      title: 'Strategic Location',
      desc: 'Proximity to major highways, industrial zones, and transportation routes makes movement of goods efficient across Central India corridors.'
    },
    {
      num: '02',
      title: 'Road Connectivity & Width',
      desc: 'Evaluating approach road width, highway connectivity, truck maneuverability, and distance from major expressways.'
    },
    {
      num: '03',
      title: 'Plot Size & Configuration',
      desc: 'Adequate land footprint for loading docks, truck parking, internal vehicle circulation, office spaces, and future storage expansion.'
    },
    {
      num: '04',
      title: 'Land-Use & Permissions',
      desc: 'Verifying zoning, land-use classifications, layout approvals, and statutory permissions required for commercial warehousing.'
    },
    {
      num: '05',
      title: 'Access to Business Corridors',
      desc: 'Positioned along major growth corridors linking Maharashtra and Central India markets effortlessly.'
    }
  ];

  faqs = [
    {
      question: 'What is a commercial plot for warehouses?',
      answer: 'A commercial plot for warehouses is land intended for commercial development where a warehouse or related storage and distribution facility can be developed, subject to applicable land-use and development permissions.'
    },
    {
      question: 'Where should I buy a warehouse plot in Nagpur?',
      answer: 'The ideal location depends on your business requirements. Areas with good highway connectivity, access to industrial and commercial zones, and convenient truck movement can be considered for warehouse development.'
    },
    {
      question: 'Is Nagpur a good location for warehousing?',
      answer: 'Nagpur\'s strategic position in Central India and its connectivity with major transportation networks make it an important location to evaluate for logistics, warehousing, and distribution businesses.'
    },
    {
      question: 'What should I check before buying commercial land for a warehouse?',
      answer: 'Buyers should verify land-use permissions, ownership documents, road access, plot dimensions, development regulations, infrastructure availability, and the suitability of the location for their proposed warehouse.'
    },
    {
      question: 'Can I build a warehouse on any commercial plot?',
      answer: 'Not necessarily. The proposed warehouse use must comply with applicable land-use classifications, development regulations, and permissions. Buyers should verify these requirements before purchasing the property.'
    }
  ];

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Commercial Plot for Warehouses in Nagpur - Mukunda Infraventures');
    this.metaService.updateTag({
      name: 'description',
      content: 'Looking for a commercial plot for warehouses in Nagpur? Explore strategically located warehouse plots with excellent connectivity to MIHAN, highways, and key business corridors.'
    });
  }

  toggleFaq(index: number): void {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }
}
