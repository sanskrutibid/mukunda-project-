
import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';

import {
  RouterModule
} from '@angular/router';

import {
  Meta,
  Title
} from '@angular/platform-browser';

@Component({
  selector: 'app-not-found',

  standalone: true,

  imports: [
    RouterModule
  ],

  template: `
    <section class="container text-center py-5 my-5">

      <h1 class="fw-bold display-4">
        Page not found
      </h1>

      <p class="lead my-4">
        The page you are looking for does not exist
        or has moved.
      </p>

      <div class="d-flex justify-content-center flex-wrap gap-2">

        <a
          routerLink="/"
          class="btn btn-danger rounded-pill px-4"
        >
          Go to Home
        </a>

        <a
          routerLink="/projects"
          class="btn btn-outline-dark rounded-pill px-4"
        >
          View Projects
        </a>

      </div>

    </section>
  `
})
export class NotFoundComponent
  implements OnInit, OnDestroy {

  constructor(
    private titleService: Title,
    private metaService: Meta
  ) {}


  ngOnInit(): void {

    /*
     * Page title for 404 page.
     */
    this.titleService.setTitle(
      'Page Not Found | Mukunda Infraventures'
    );


    /*
     * Prevent search engines from
     * indexing the 404 page.
     */
    this.metaService.updateTag({
      name: 'robots',
      content: 'noindex, nofollow'
    });

  }


  ngOnDestroy(): void {

    /*
     * Restore normal robots setting
     * when the user navigates away.
     */
    this.metaService.updateTag({
      name: 'robots',
      content: 'index, follow'
    });

  }

}

