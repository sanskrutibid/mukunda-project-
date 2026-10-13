import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { BlogService } from '../blog.service';
import { Blog } from '../blog.model';
import { SeoService } from '../seo.service';
import { slugify } from '../blog-slug';

@Component({
  selector: 'app-blog-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './blog-detail.component.html',
  styleUrl: './blog-detail.component.css'
})
export class BlogDetailComponent implements OnInit {

  blogs: Blog[] = [];
  currentBlog?: Blog;
  private index = -1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private blogService: BlogService,
    private seo: SeoService
  ) {}

  ngOnInit(): void {
    this.blogs = this.blogService.getBlogs();

    // Previous / Next dabane par same component rehta hai, isliye subscribe
    this.route.paramMap.subscribe(params => this.load(params.get('slug')));
  }

  private load(param: string | null): void {
    const i = this.blogs.findIndex(b => slugify(b.title) === param);

    if (i === -1) {
      // purana /blog/1 link: naye slug URL par bhej do
      const byId = this.blogs.findIndex(b => String(b.id) === param);
      if (byId !== -1) {
        this.router.navigate(['/blog', slugify(this.blogs[byId].title)], { replaceUrl: true });
        return;
      }

      // koi blog nahi mila: 404 page dikhao
      this.router.navigateByUrl('/page-not-found', { skipLocationChange: true });
      return;
    }

    this.index = i;
    const blog = this.blogs[i];
    this.currentBlog = blog;

    // summary aur image optional hain, isliye fallback diya hai (error fix)
    this.seo.setPage({
      title: blog.title + ' | Mukunda Infraventures',
      description:
        blog.summary ||
        'Read real estate insights and property tips from Mukunda Infraventures, Nagpur.',
      path: '/blog/' + slugify(blog.title),
      image: blog.image || undefined,
      type: 'article'
    });
  }

  get hasPrev(): boolean { return this.index > 0; }
  get hasNext(): boolean { return this.index < this.blogs.length - 1; }

  get prevId(): number | null { return this.hasPrev ? this.blogs[this.index - 1].id : null; }
  get nextId(): number | null { return this.hasNext ? this.blogs[this.index + 1].id : null; }

  goTo(id: number | null): void {
    if (id === null) {
      return;
    }
    const blog = this.blogs.find(b => b.id === id);
    if (blog) {
      this.router.navigate(['/blog', slugify(blog.title)]);
    }
  }
}