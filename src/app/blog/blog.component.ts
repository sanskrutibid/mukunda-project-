import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight, faCircleCheck, faCoffee, faSquare } from '@fortawesome/free-solid-svg-icons';
import { faInstagram as fabInstagram } from '@fortawesome/free-brands-svg-icons';
import { faMapMarkerAlt, faBuilding, faTools } from '@fortawesome/free-solid-svg-icons';
import { Router, RouterModule } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../blog.model';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-blog',
  imports: [CommonModule, FontAwesomeModule, RouterModule,],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.css'
})
export class BlogComponent implements OnInit {
  faSquare = faSquare;
  faMapMarkerAlt = faMapMarkerAlt;
  faBuilding = faBuilding;
  faTools = faTools;
  faArrowRight = faArrowRight;
  faCircleCheck = faCircleCheck;

  constructor(library: FaIconLibrary, private router: Router, private blogService: BlogService,
    private titleService: Title,
    private metaService: Meta
  ) {
    library.addIcons(faCoffee, fabInstagram);
  }

  onSelectChange(event: any) {
    const value = event.target.value;
    if (value === 'residential') {
      this.router.navigate(['/ayodhya']);
    } else if (value === 'commercial') {
      this.router.navigate(['/karmabhumi']);
    } else if (value === 'plots') {
      this.router.navigate(['/vraj']);
    }
  }

  blogs: Blog[] = [];
  paginatedBlogs: Blog[] = [];
  pageSize = 2;
  currentPage = 1;


  ngOnInit(): void {

    this.titleService.setTitle('Real Estate Blog in Nagpur - Property Tips & Updates');

    this.metaService.updateTag({
      name: 'description',
      content: 'Read the latest real estate insights, property tips, investment guidance and market updates in Nagpur from Mukunda Infraventures.'
    });

    this.blogs = this.blogService.getBlogs();
    this.updatePaginatedBlogs();
  }

  updatePaginatedBlogs(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedBlogs = this.blogs.slice(start, end);
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.updatePaginatedBlogs();
  }

  get totalPages(): number[] {
    const pages = Math.ceil(this.blogs.length / this.pageSize);
    return Array.from({ length: pages }, (_, i) => i + 1);
  }


}
