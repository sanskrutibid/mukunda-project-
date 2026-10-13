import { Component, OnDestroy, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent implements OnInit, OnDestroy {

  constructor(private title: Title, private meta: Meta) {}

  ngOnInit(): void {
    this.title.setTitle('Page Not Found | Mukunda Infraventures');
    this.meta.updateTag({ name: 'robots', content: 'noindex, nofollow' });
  }

  /* Dusre page par jaane par robots wapas normal kar do */
  ngOnDestroy(): void {
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
  }
}
