import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { authGuard } from './guards/auth.guards';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
{ path: 'home', loadComponent: () => import('./home-office/home-office.component').then(m => m.HomeOfficeComponent) },

  // {
  //   path: 'login',
  //   loadComponent: () => import('./login/login.component').then(m => m.LoginComponent),
  // },
  // {
  //   path: 'signup',
  //   loadComponent: () => import('./signup/signup.component').then(m => m.SignupComponent),
  // },
  // {
  //   path: 'dashboard',
  //   loadComponent: () => import('./dashboard/dashboard.component').then(m => m.DashboardComponent),
  // },

  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  {
    path: 'admin',
    loadComponent: () => import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent),
    canActivate: [authGuard] // optional: for protected access
  },
  { path: 'admin/about', loadComponent: () => import('./admin/about-editor/about-editor.component').then(m => m.AboutEditorComponent) },
  { path: 'admin/vision', loadComponent: () => import('./admin/vision-mission-values/vision-mission-values.component').then(m => m.VisionMissionValuesComponent) },
  { path: 'admin/video', loadComponent: () => import('./admin/videosection/videosection.component').then(m => m.VideosectionComponent) },
  { path: 'admin/carousel', loadComponent: () => import('./admin/carousel-section/carousel-section.component').then(m => m.CarouselSectionComponent) },
  { path: 'admin/slider', loadComponent: () => import('./admin/slider-section/slider-section.component').then(m => m.SliderSectionComponent) },
  
  // { path: 'admin/projects', loadComponent: () => import('./admin/projects.component').then(m => m.ProjectsComponent) },
  { path: 'discover', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'aboutus', loadComponent: () => import('./about-us/about-us.component').then(m => m.AboutUsComponent) },
  { path: 'projects', loadComponent: () => import('./projectdetail/projectdetail.component').then(m => m.ProjectdetailComponent) },
  { path: 'contacts', loadComponent: () => import('./contact-us/contact-us.component').then(m => m.ContactUsComponent) },
  { path: 'blog', loadComponent: () => import('./blog/blog.component').then(m => m.BlogComponent) },
  { path: 'career', loadComponent: () => import('./career/career.component').then(m => m.CareerComponent) },
{
    path: 'blog/:id',
    loadComponent: () => import('./blog-detail/blog-detail.component').then(m => m.BlogDetailComponent),
  },


  { path: 'keshavam-city-7', loadComponent: () => import('./keshavam-city-7/keshavam-city-7.component').then(m => m.KeshavamCity7Component) },
  { path: 'karmabhumi', loadComponent: () => import('./karmabhoomi/karmabhoomi.component').then(m => m.KarmabhoomiComponent) },
  { path: 'vraj', loadComponent: () => import('./vraj/vraj.component').then(m => m.VrajComponent) },
  { path: 'ayodhya', loadComponent: () => import('./ayodhya/ayodhya.component').then(m => m.AyodhyaComponent) },
  { path: 'dwarka', loadComponent: () => import('./dwarka/dwarka.component').then(m => m.DwarkaComponent) },
{ path: 'keshavam-city-9', loadComponent: () => import('./keshavam-city-9/keshavam-city-9.component').then(m => m.KeshavamCity9Component) },
{ path: 'keshavam-city-10', loadComponent: () => import('./keshavam-city-10/keshavam-city-10.component').then(m => m.KeshavamCity10Component) },

  { path: 'location', loadComponent: () => import('./commercial-plots/commercial-plots.component').then(m => m.CommercialPlotsComponent) },
  { path: 'location/plots-in-nagpur', loadComponent: () => import('./commercial-plots/commercial-plots-nagpur/commercial-plots-nagpur.component').then(m => m.CommercialPlotsNagpurComponent) },
  { path: 'location/warehouses-in-nagpur', loadComponent: () => import('./commercial-plots/commercial-plots-warehouse/commercial-plots-warehouse.component').then(m => m.CommercialPlotsWarehouseComponent) },
  { path: 'commercial-plots', redirectTo: 'location', pathMatch: 'full' },
  { path: 'commercial-plots/plots-in-nagpur', redirectTo: 'location/plots-in-nagpur', pathMatch: 'full' },
  { path: 'commercial-plots/warehouses-in-nagpur', redirectTo: 'location/warehouses-in-nagpur', pathMatch: 'full' },
];








