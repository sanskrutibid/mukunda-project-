import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-commercial-plots-nagpur',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './commercial-plots-nagpur.component.html',
  styleUrl: './commercial-plots-nagpur.component.css'
})
export class CommercialPlotsNagpurComponent implements OnInit {
  activeFaqIndex: number | null = 0;

  faqs = [
    {
      question: 'What are commercial plots in Nagpur?',
      answer: 'Commercial plots are parcels of land designated or permitted for specified commercial activities under applicable planning and development regulations. The permitted use depends on the property\'s land-use classification and approvals.'
    },
    {
      question: 'Where can I find commercial plots in Nagpur?',
      answer: 'Commercial land opportunities can be found across different parts of Nagpur and its surrounding growth corridors. Locations near major roads, highways, industrial areas, and developing commercial zones may be considered depending on the intended business activity.'
    },
    {
      question: 'Can I buy a commercial plot for a warehouse in Nagpur?',
      answer: 'Yes, commercial land may be suitable for warehouse development depending on the property\'s permitted land use, development regulations, access, infrastructure, and required approvals. These factors should be verified before purchase.'
    },
    {
      question: 'Can I buy a commercial plot for a factory in Nagpur?',
      answer: 'A plot intended for factory or manufacturing use must meet the applicable land-use, zoning, infrastructure, and statutory requirements. Buyers should verify the property\'s suitability for the specific proposed manufacturing activity.'
    },
    {
      question: 'Are commercial plots near MIHAN a good investment?',
      answer: 'Commercial land near MIHAN can be attractive to businesses and investors because of its strategic location and connectivity. However, investment suitability depends on factors such as location, permitted land use, infrastructure, price, documentation, and future development potential.'
    },
    {
      question: 'Is Bhandara Road suitable for commercial plots?',
      answer: 'Bhandara Road is an important connectivity corridor from Nagpur towards the eastern region. Its suitability for a particular commercial property depends on the exact location, accessibility, land-use permissions, and intended business activity.'
    },
    {
      question: 'Are commercial plots near Samruddhi Highway suitable for warehouses?',
      answer: 'Highway-connected locations can be considered for warehouse and logistics requirements where the land-use permissions, road access, plot characteristics, and infrastructure are suitable for the intended operation.'
    },
    {
      question: 'What should I check before buying commercial land in Nagpur?',
      answer: 'Buyers should verify title and ownership, encumbrances, land-use classification, layout and development permissions, road access, infrastructure, applicable approvals, and other legal and regulatory requirements before purchasing.'
    },
    {
      question: 'How do I choose the right commercial plot in Nagpur?',
      answer: 'Start by defining your intended business use, required plot size, budget, preferred corridor, and connectivity requirements. Then evaluate the property\'s legal documentation, permitted use, infrastructure, accessibility, and development feasibility.'
    }
  ];

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('Commercial Plots in Nagpur - Mukunda Infraventures');
    this.metaService.updateTag({
      name: 'description',
      content: 'Explore commercial plots in Nagpur for warehouses, factories, offices, and investment. Find strategically located land near MIHAN, Bhandara Road & Samruddhi Highway.'
    });
  }

  toggleFaq(index: number): void {
    this.activeFaqIndex = this.activeFaqIndex === index ? null : index;
  }
}
