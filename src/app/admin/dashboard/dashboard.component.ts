import { CommonModule } from "@angular/common";
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { Router, RouterModule } from '@angular/router'; // ✅ Router imported
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
Chart.register(...registerables);
declare var bootstrap: any;

@Component({
  standalone: true,
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  imports: [RouterModule, CommonModule, NgChartsModule, FormsModule],
})
export class DashboardComponent implements AfterViewInit, OnInit {
  links = [
    { label: 'About Section', path: '/admin/about' },
    { label: 'Vision / Mission', path: '/admin/vision' },
    { label: 'Projects', path: '/admin/projects' },
    // Add more sections as needed
  ];
  pageStats: any = {};
  bounceRate: string = '0%';
  trafficData: { [key: string]: { views: number, lastVisit: string } } = {};

  inquiries = [
    { id: 1, name: 'Jacob', type: 'Commercial', date: '2019-Apr-04', status: 'Open', contact: '124 548 1254' },
    { id: 2, name: 'William', type: 'Residential', date: '2019-Apr-15', status: 'Open', contact: '845 548 1254' },
    { id: 3, name: 'Jayden', type: 'Commercial', date: '2019-Apr-18', status: 'Open', contact: '566 985 1254' },
    { id: 4, name: 'Michael', type: 'Commercial', date: '2019-Apr-22', status: 'On Hold', contact: '965 985 1254' },
    { id: 5, name: 'Alexander', type: 'Residential', date: '2019-Apr-04', status: 'Open', contact: '632 987 1254' },
    { id: 6, name: 'Anthony', type: 'Residential', date: '2019-Apr-04', status: 'Open', contact: '321 456 1254' }
  ];
  constructor(private router: Router) { }

  // Traffic Source Pie Chart
  selectedPage: string = 'Home';

  pages = ['Home', 'About', 'Contact','Vedio','Slider','Carousel'];

  trafficSources: { [key: string]: number[] } = {
    Home: [30, 40, 30],
    About: [20, 50, 30],
    Contact: [25, 25, 50],
    Video: [25, 25, 50],
    Slider: [25, 25, 50],
    Carousel:[30,56,80]
  };

  pieChartLabels = ['Direct', 'Referral', 'Social'];
  pieChartData: number[] = [];
  pieChartType: any = 'pie';

  pieChartOptions = {
    responsive: true,
    maintainAspectRatio: false
  };

  pieChartColors: string[] = ['#f06292', '#64b5f6', '#ffeb3b', '#e0e0e0'];


  // Example bounce rate data over time (you can replace with real data)
  public bounceRateChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data: [45, 50, 47, 60, 42, 55, 53],
        label: 'Bounce Rate (%)',
        fill: true,
        tension: 0.4,
        borderColor: '#42A5F5',
        backgroundColor: 'rgba(66,165,245,0.2)',
        pointBackgroundColor: '#42A5F5',
        pointBorderColor: '#fff',
      }
    ]
  };

  public bounceRateChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      }
    },
    scales: {
      y: {
        min: 0,
        max: 100,
        ticks: {
          callback: value => `${value}%`,
        }
      }
    }
  };
  public bounceRateChartType: 'line' = 'line';

  //
  selectedMonth: string = new Date().toISOString().substring(0, 7); // current month (YYYY-MM)
  marketingEvents = [
    { title: 'Facebook', date: new Date('2025-04-15') },
    { title: 'Email: New Projects', date: new Date('2025-04-18') },
  ];

  addMarketingEvent() {
    const title = prompt('Enter event title:');
    const date = prompt('Enter date (YYYY-MM-DD):');
    if (title && date) {
      this.marketingEvents.push({ title, date: new Date(date) });
    }
  }

  removeMarketingEvent(eventToRemove: any) {
    this.marketingEvents = this.marketingEvents.filter(e => e !== eventToRemove);
  }



  ngOnInit() {
    this.updatePieChart();
    const stats = localStorage.getItem('pageVisits');
    if (stats) {
      this.pageStats = JSON.parse(stats);
    }

    const bounces = parseInt(localStorage.getItem('bounces') || '0', 10);
    const visits = parseInt(localStorage.getItem('visits') || '0', 10);

    if (visits > 0) {
      this.bounceRate = ((bounces / visits) * 100).toFixed(2) + '%';
    }
    document.addEventListener('click', this.handleClickOutside.bind(this));

  }

  handleClickOutside(event: Event) {
    const target = event.target as HTMLElement;
  
    // Close theme dropdown if clicked outside
    if (!target.closest('.dropdown.me-3')) {
      this.isThemeDropdownOpen = false;
    }
  
    // Close user dropdown if clicked outside
    if (!target.closest('.dropdown')) {
      this.isUserDropdownOpen = false;
    }
  }

  isThemeDropdownOpen: boolean = false;

  toggleThemeDropdown() {
    this.isThemeDropdownOpen = !this.isThemeDropdownOpen;
  }

  isUserDropdownOpen: boolean = false;

  toggleUserDropdown() {
    this.isUserDropdownOpen = !this.isUserDropdownOpen;
  }

  updatePieChart(): void {
    this.pieChartData = this.trafficSources[this.selectedPage];
  }

  onPageChange(): void {
    this.updatePieChart();
  }





  go(path: string) {
    this.router.navigateByUrl(path);
  }

  logout() {
    localStorage.removeItem('admin');
    this.router.navigateByUrl('/login');
  }

  setTheme(theme: string): void {
    if (theme === 'dark') {
      document.body.classList.add('bg-dark', 'text-white');
    } else {
      document.body.classList.remove('bg-dark', 'text-white');
    }
  }

  logoutadmin() {
    localStorage.clear();
    // redirect to login page
    window.location.href = '/login';
  }

  ngAfterViewInit(): void {
    const ctx = document.getElementById('bookingStatusChart') as HTMLCanvasElement;

    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['February', 'April', 'June'],
        datasets: [
          { label: 'Status 1', data: [2000, 4500, 3000], backgroundColor: 'orange' },
          { label: 'Status 2', data: [1500, 3800, 2500], backgroundColor: 'blue' },
          { label: 'Status 3', data: [1200, 3500, 2000], backgroundColor: 'yellow' }
        ]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });

  }



}

