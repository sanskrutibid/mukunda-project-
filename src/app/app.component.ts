
import {
  Component,
  Inject,
  OnInit,
  AfterViewInit,
  OnDestroy,
  PLATFORM_ID
} from '@angular/core';

import { isPlatformBrowser } from '@angular/common';

import {
  Router,
  NavigationEnd,
  RouterOutlet
} from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { StickyContactComponent } from './sticky-contact/sticky-contact.component';

import { filter } from 'rxjs/operators';

declare const AOS: any;

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    StickyContactComponent
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {

  routeChanges = 0;

  isBrowser: boolean;

  /*
   * MutationObserver watches dynamically loaded
   * Angular page content and removes native
   * browser image tooltips.
   */
  private imageObserver?: MutationObserver;


  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: object
  ) {

    this.isBrowser =
      isPlatformBrowser(
        this.platformId
      );


    /*
     * Scroll to top after every route change.
     */
    this.router.events
      .pipe(
        filter(
          event =>
            event instanceof NavigationEnd
        )
      )
      .subscribe(() => {

        if (!this.isBrowser) {
          return;
        }

        window.scrollTo({
          top: 0,
          behavior: 'auto'
        });


        /*
         * Process images after Angular
         * loads the new route.
         */
        setTimeout(() => {

          this.removeImageHoverTitles();

        }, 0);

      });
  }


  ngOnInit(): void {

    /*
     * Route/page tracking.
     */
    this.router.events.subscribe(event => {

      if (
        event instanceof NavigationEnd
      ) {

        const page =
          event.urlAfterRedirects;


        console.log(
          'Page visited:',
          page
        );


        if (this.isBrowser) {

          this.logPageVisit(
            page
          );

        }

      }

    });


    /*
     * Browser-only functionality.
     */
    if (this.isBrowser) {


      /*
       * Route tracking.
       */
      this.router.events.subscribe(
        event => {

          if (
            event instanceof NavigationEnd
          ) {

            this.routeChanges++;


            sessionStorage.setItem(
              'routeCount',
              this.routeChanges.toString()
            );

          }

        }
      );


      /*
       * Before user leaves the tab
       * or reloads the page.
       */
      window.addEventListener(
        'beforeunload',
        () => {

          const count =
            parseInt(
              sessionStorage.getItem(
                'routeCount'
              ) || '0',
              10
            );


          const bounces =
            parseInt(
              localStorage.getItem(
                'bounces'
              ) || '0',
                10
              );


          const visits =
            parseInt(
              localStorage.getItem(
                'visits'
              ) || '0',
                10
              );


          /*
           * Count bounce.
           */
          if (count <= 1) {

            localStorage.setItem(
              'bounces',
              (
                bounces + 1
              ).toString()
            );

          }


          /*
           * Count visit.
           */
          localStorage.setItem(
            'visits',
            (
              visits + 1
            ).toString()
          );

        }
      );


      /*
       * Initialize AOS only in browser.
       */
      if (
        typeof AOS !== 'undefined'
      ) {

        AOS.init({
          duration: 3000,
          once: false
        });

      }

    }

  }


  /*
   * Runs after the application view
   * has been initialized.
   */
  ngAfterViewInit(): void {

    if (!this.isBrowser) {
      return;
    }


    /*
     * Remove title tooltip from
     * images already on the page.
     */
    this.removeImageHoverTitles();


    /*
     * Watch the entire application
     * for dynamically added images.
     *
     * This makes the solution work
     * across all Angular routes.
     */
    this.imageObserver =
      new MutationObserver(
        mutations => {

          let hasNewImages = false;


          mutations.forEach(
            mutation => {

              /*
               * Check newly added elements.
               */
              mutation.addedNodes.forEach(
                node => {

                  if (
                    node.nodeType !==
                    Node.ELEMENT_NODE
                  ) {
                    return;
                  }


                  const element =
                    node as Element;


                  /*
                   * If the added element itself
                   * is an image.
                   */
                  if (
                    element.tagName.toLowerCase() ===
                    'img'
                  ) {

                    hasNewImages = true;

                  }


                  /*
                   * If the added element contains
                   * images.
                   */
                  if (
                    element.querySelector(
                      'img'
                    )
                  ) {

                    hasNewImages = true;

                  }

                }
              );

            }
          );


          /*
           * Only process images when
           * new image content is added.
           */
          if (hasNewImages) {

            this.removeImageHoverTitles();

          }

        }
      );


    this.imageObserver.observe(
      document.body,
      {
        childList: true,
        subtree: true
      }
    );

  }


  /*
   * Globally removes the native
   * browser tooltip from images.
   *
   * IMPORTANT:
   *
   * The alt attribute is NEVER touched.
   *
   * The original title value is preserved
   * in data-seo-title.
   *
   * Example:
   *
   * BEFORE:
   *
   * <img
   *   src="image.jpg"
   *   alt="Mukunda Infraventures"
   *   title="Mukunda Infraventures"
   * >
   *
   * AFTER:
   *
   * <img
   *   src="image.jpg"
   *   alt="Mukunda Infraventures"
   *   data-seo-title="Mukunda Infraventures"
   * >
   *
   * This prevents the browser's native
   * title tooltip.
   */
  private removeImageHoverTitles(): void {

    if (!this.isBrowser) {
      return;
    }


    const images =
      document.querySelectorAll(
        'img[title]'
      );


    images.forEach(
      element => {

        const img =
          element as HTMLImageElement;


        const title =
          img.getAttribute(
            'title'
          );


        /*
         * Ignore empty title attributes.
         */
        if (
          title === null ||
          title.trim() === ''
        ) {
          return;
        }


        /*
         * Preserve the original title
         * value in a custom attribute.
         */
        if (
          !img.hasAttribute(
            'data-seo-title'
          )
        ) {

          img.setAttribute(
            'data-seo-title',
            title
          );

        }


        /*
         * IMPORTANT:
         *
         * Do NOT touch alt.
         *
         * Only remove title so that
         * the browser cannot display
         * its native tooltip.
         */
        img.removeAttribute(
          'title'
        );

      }
    );

  }


  /*
   * Clean up MutationObserver when
   * the root component is destroyed.
   */
  ngOnDestroy(): void {

    if (this.imageObserver) {

      this.imageObserver.disconnect();

      this.imageObserver = undefined;

    }

  }


  /*
   * Page visit tracking.
   */
  logPageVisit(
    page: string
  ): void {

    if (!this.isBrowser) {
      return;
    }


    const now =
      new Date().toISOString();


    const visits =
      JSON.parse(
        localStorage.getItem(
          'pageVisits'
        ) || '{}'
      );


    if (!visits[page]) {

      visits[page] = {
        views: 0,
        lastVisit: now
      };

    }


    visits[page].views += 1;

    visits[page].lastVisit =
      now;


    localStorage.setItem(
      'pageVisits',
      JSON.stringify(
        visits
      )
    );

  }

}


