import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../blog.model';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule],
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.css']
})
export class BlogDetailComponent implements OnInit {
 currentBlog?: Blog;
  blogIds: number[] = [];
  currentId!: number;
  hasPrev = false;
  hasNext = false;
  prevId?: number;
  nextId?: number;

  constructor(private route: ActivatedRoute, private blogService: BlogService, private router: Router) {
    this.route.params.subscribe(params => {
      this.currentId = +params['id'];
      this.currentBlog = this.blogService.getBlogById(this.currentId);
      this.blogIds = this.blogService.getBlogs().map(b => b.id);
      this.updateNavState();
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  updateNavState() {
    const idx = this.blogIds.indexOf(this.currentId);
    this.hasPrev = idx > 0;
    this.hasNext = idx < this.blogIds.length - 1;
    this.prevId = this.hasPrev ? this.blogIds[idx - 1] : undefined;
    this.nextId = this.hasNext ? this.blogIds[idx + 1] : undefined;
  }

  goTo(id?: number) {
    if (id) this.router.navigate(['/blog', id]);
  }
}