import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { StickyContactComponent } from './sticky-contact/sticky-contact.component';
import { filter } from 'rxjs/operators';
declare const AOS: any; 

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet,NavbarComponent,FooterComponent,StickyContactComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  routeChanges = 0;
  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Scroll to top on every route change
      window.scrollTo({ top: 0, behavior: 'auto' }); // or 'smooth'
    });

  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const page = event.urlAfterRedirects;
        console.log('Page visited:', page);
        this.logPageVisit(page);
      }
    });

  
      // Track route changes
      this.router.events.subscribe(event => {
        if (event instanceof NavigationEnd) {
          this.routeChanges++;
          sessionStorage.setItem('routeCount', this.routeChanges.toString());
        }
      });
  
      // Before user leaves tab or reloads
      window.addEventListener('beforeunload', () => {
        const count = parseInt(sessionStorage.getItem('routeCount') || '0', 10);
        const bounces = parseInt(localStorage.getItem('bounces') || '0', 10);
        const visits = parseInt(localStorage.getItem('visits') || '0', 10);
  
        // Count as bounce if user only viewed one page
        if (count <= 1) {
          localStorage.setItem('bounces', (bounces + 1).toString());
        }
  
        localStorage.setItem('visits', (visits + 1).toString());
      });

     
        AOS.init({
          duration: 3000,
          once: false
        });
    
    }


  logPageVisit(page: string) {
    const now = new Date().toISOString();
    const visits = JSON.parse(localStorage.getItem('pageVisits') || '{}');

    if (!visits[page]) {
      visits[page] = { views: 0, lastVisit: now };
    }

    visits[page].views += 1;
    visits[page].lastVisit = now;

    localStorage.setItem('pageVisits', JSON.stringify(visits));
  }
}
