import { Routes } from '@angular/router';

import { authGuard } from './guards/auth.guards';

export const routes: Routes = [

  // =========================================================
  // HOME
  // URL: /
  // =========================================================

  {
    path: '',
    loadComponent: () =>
      import('./home-office/home-office.component')
        .then(m => m.HomeOfficeComponent)
  },

  // =========================================================
  // OLD HOME URL
  // /home → /
  // =========================================================

  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },

  // =========================================================
  // LOGIN
  // =========================================================

  {
    path: 'login',
    loadComponent: () =>
      import('./login/login.component')
        .then(m => m.LoginComponent)
  },

  // =========================================================
  // ADMIN DASHBOARD
  // =========================================================

  {
    path: 'admin',
    loadComponent: () =>
      import('./admin/dashboard/dashboard.component')
        .then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },

  // =========================================================
  // ADMIN - ABOUT
  // =========================================================

  {
    path: 'admin/about',
    loadComponent: () =>
      import('./admin/about-editor/about-editor.component')
        .then(m => m.AboutEditorComponent)
  },

  // =========================================================
  // ADMIN - VISION / MISSION / VALUES
  // =========================================================

  {
    path: 'admin/vision',
    loadComponent: () =>
      import('./admin/vision-mission-values/vision-mission-values.component')
        .then(m => m.VisionMissionValuesComponent)
  },

  // =========================================================
  // ADMIN - VIDEO
  // =========================================================

  {
    path: 'admin/video',
    loadComponent: () =>
      import('./admin/videosection/videosection.component')
        .then(m => m.VideosectionComponent)
  },

  // =========================================================
  // ADMIN - CAROUSEL
  // =========================================================

  {
    path: 'admin/carousel',
    loadComponent: () =>
      import('./admin/carousel-section/carousel-section.component')
        .then(m => m.CarouselSectionComponent)
  },

  // =========================================================
  // ADMIN - SLIDER
  // =========================================================

  {
    path: 'admin/slider',
    loadComponent: () =>
      import('./admin/slider-section/slider-section.component')
        .then(m => m.SliderSectionComponent)
  },

  // =========================================================
  // DISCOVER
  // URL: /discover
  // =========================================================

  {
    path: 'discover',
    loadComponent: () =>
      import('./home/home.component')
        .then(m => m.HomeComponent)
  },

  // =========================================================
  // ABOUT US
  // URL: /aboutus
  // =========================================================

  {
    path: 'aboutus',
    loadComponent: () =>
      import('./about-us/about-us.component')
        .then(m => m.AboutUsComponent)
  },

  // =========================================================
  // PROJECTS
  // URL: /projects
  // =========================================================

  {
    path: 'projects',
    loadComponent: () =>
      import('./projectdetail/projectdetail.component')
        .then(m => m.ProjectdetailComponent)
  },

  // =========================================================
  // CONTACTS
  // URL: /contacts
  // =========================================================

  {
    path: 'contacts',
    loadComponent: () =>
      import('./contact-us/contact-us.component')
        .then(m => m.ContactUsComponent)
  },

  // =========================================================
  // BLOG
  // URL: /blog
  // =========================================================

  {
    path: 'blog',
    loadComponent: () =>
      import('./blog/blog.component')
        .then(m => m.BlogComponent)
  },

  // =========================================================
  // CAREER
  // URL: /career
  // =========================================================

  {
    path: 'career',
    loadComponent: () =>
      import('./career/career.component')
        .then(m => m.CareerComponent)
  },

  // =========================================================
  // FAQ
  // URL: /faq
  // =========================================================

  {
    path: 'faq',
    loadComponent: () =>
      import('./faq/faq.component')
        .then(m => m.FaqComponent)
  },

  // =========================================================
  // BLOG DETAILS
  // URL: /blog/1
  // URL: /blog/2
  // etc.
  // =========================================================

  {
    path: 'blog/:id',
    loadComponent: () =>
      import('./blog-detail/blog-detail.component')
        .then(m => m.BlogDetailComponent)
  },

  // =========================================================
  // PROJECT - KESHAVAM CITY 7
  // =========================================================

  {
    path: 'keshavam-city-7',
    loadComponent: () =>
      import('./keshavam-city-7/keshavam-city-7.component')
        .then(m => m.KeshavamCity7Component)
  },

  // =========================================================
  // PROJECT - KARMABHUMI
  // =========================================================

  {
    path: 'karmabhumi',
    loadComponent: () =>
      import('./karmabhoomi/karmabhoomi.component')
        .then(m => m.KarmabhoomiComponent)
  },

  // =========================================================
  // PROJECT - VRAJ
  // =========================================================

  {
    path: 'vraj',
    loadComponent: () =>
      import('./vraj/vraj.component')
        .then(m => m.VrajComponent)
  },

  // =========================================================
  // PROJECT - AYODHYA
  // =========================================================

  {
    path: 'ayodhya',
    loadComponent: () =>
      import('./ayodhya/ayodhya.component')
        .then(m => m.AyodhyaComponent)
  },

  // =========================================================
  // PROJECT - DWARKA
  // =========================================================

  {
    path: 'dwarka',
    loadComponent: () =>
      import('./dwarka/dwarka.component')
        .then(m => m.DwarkaComponent)
  },

  // =========================================================
  // PROJECT - KESHAVAM CITY 9
  // =========================================================

  {
    path: 'keshavam-city-9',
    loadComponent: () =>
      import('./keshavam-city-9/keshavam-city-9.component')
        .then(m => m.KeshavamCity9Component)
  },

  // =========================================================
  // PROJECT - KESHAVAM CITY 10
  // =========================================================

  {
    path: 'keshavam-city-10',
    loadComponent: () =>
      import('./keshavam-city-10/keshavam-city-10.component')
        .then(m => m.KeshavamCity10Component)
  },

  // =========================================================
  // LOCATION
  // URL: /location
  // =========================================================

  {
    path: 'location',
    loadComponent: () =>
      import('./commercial-plots/commercial-plots.component')
        .then(m => m.CommercialPlotsComponent)
  },

  // =========================================================
  // PLOTS IN NAGPUR
  // URL: /location/plots-in-nagpur
  // =========================================================

  {
    path: 'location/plots-in-nagpur',
    loadComponent: () =>
      import('./commercial-plots/commercial-plots-nagpur/commercial-plots-nagpur.component')
        .then(m => m.CommercialPlotsNagpurComponent)
  },

  // =========================================================
  // WAREHOUSES IN NAGPUR
  // URL: /location/warehouses-in-nagpur
  // =========================================================

  {
    path: 'location/warehouses-in-nagpur',
    loadComponent: () =>
      import('./commercial-plots/commercial-plots-warehouse/commercial-plots-warehouse.component')
        .then(m => m.CommercialPlotsWarehouseComponent)
  },

  // =========================================================
  // OLD COMMERCIAL PLOTS URLS
  // Redirect to SEO-friendly location URLs
  // =========================================================

  {
    path: 'commercial-plots',
    redirectTo: 'location',
    pathMatch: 'full'
  },

  {
    path: 'commercial-plots/plots-in-nagpur',
    redirectTo: 'location/plots-in-nagpur',
    pathMatch: 'full'
  },

  {
    path: 'commercial-plots/warehouses-in-nagpur',
    redirectTo: 'location/warehouses-in-nagpur',
    pathMatch: 'full'
  },

  // =========================================================
  // 404 - PAGE NOT FOUND
  // Must stay LAST: it matches every URL not matched above.
  // =========================================================

  {
    path: '**',
    loadComponent: () =>
      import('./not-found/not-found.component')
        .then(m => m.NotFoundComponent)
  }

];