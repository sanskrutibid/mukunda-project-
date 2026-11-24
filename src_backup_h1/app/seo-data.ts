export interface SeoEntry {
  title?: string;        // nahi diya to page ka purana title rahega
  description?: string;  // nahi diya to page ka purana description rahega
  image?: string;        // OG preview image (jpg/png, WebP nahi), 1200x630
}

// Key = page ka URL path (bina trailing slash ke)
export const SEO_DATA: Record<string, SeoEntry> = {

  // ---------- MAIN PAGES ----------

  '/': {
    title: 'Residential & Industrial Plots in Nagpur | Mukunda',
    description: 'Plots across Nagpur: Karmabhoomi industrial estate, Ayodhya, Keshavam City and more. See MahaRERA numbers and book a site visit.',
    image: 'assets/og/home.jpg'
  },

  '/discover': {
    image: 'assets/og/home.jpg'
  },

  '/aboutus': {
    title: 'About Mukunda Infraventures | Plot Developer in Nagpur',
    image: 'assets/og/home.jpg'
  },

  '/projects': {
    title: 'Plotted Projects in Nagpur | Mukunda Infraventures',
    image: 'assets/og/home.jpg'
  },

  '/contacts': {
    image: 'assets/og/home.jpg'
  },

  '/blog': {
    image: 'assets/og/blog.jpg'
  },

  '/career': {
    title: 'Careers at Mukunda Infraventures, Nagpur',
    image: 'assets/og/home.jpg'
  },

  '/faq': {
    description: 'Explore residential plots in Nagpur with details on prices, RERA, NMRDA and NIT approvals, plot loans, legal documents, Mukunda projects, and site visits.',
    image: 'assets/og/home.jpg'
  },

  // ---------- PROJECTS ----------

  '/karmabhumi': {
    title: 'Karmabhoomi: Industrial Plots on Bhandara Road, Nagpur',
    image: 'assets/og/karmabhumi.jpg'
  },

  '/ayodhya': {
    title: 'Ayodhya: Residential Plots in Tarodi, Nagpur | Mukunda',
    image: 'assets/og/ayodhya.jpg'
  },

  '/vraj': {
    title: 'Vraj: Residential Plots in Jamtha, Nagpur | Mukunda',
    description: 'Explore residential plots for sale in Nagpur at Vraj by Mukunda Infraventures, ideal for building your dream home and securing your future.',
    image: 'assets/og/vraj.jpg'
  },

  '/dwarka': {
    title: 'Dwarka: Residential Plots in Sumthana, Nagpur | Mukunda',
    image: 'assets/og/dwarka.jpg'
  },

  '/keshavam-city-7': {
    title: 'Keshavam City 7, MIHAN: Sold Out | Mukunda Infraventures',
    image: 'assets/og/home.jpg'
  },

  '/keshavam-city-9': {
    title: 'Keshavam City 9: Plots in Wagdhara, Hingna | Mukunda',
    image: 'assets/og/keshavam-city-9.jpg'
  },

  '/keshavam-city-10': {
    title: 'Keshavam City 10: Plots in Wagdhara, Hingna | Mukunda',
    image: 'assets/og/keshavam-city-10.jpg'
  },

  // ---------- LOCATION (sub pages) ----------

  '/location': {
    title: 'Industrial & Commercial Land in Nagpur | Mukunda',
    image: 'assets/og/home.jpg'
  },

  '/location/plots-in-nagpur': {
    title: 'Industrial & Commercial Plots in Nagpur | Mukunda',
    description: 'Explore commercial plots in Nagpur for warehouses, factories, offices, and investment near MIHAN, Bhandara Road, and Samruddhi Highway.',
    image: 'assets/og/home.jpg'
  },

  '/location/warehouses-in-nagpur': {
    description: 'Explore commercial warehouse plots in Nagpur with excellent connectivity to MIHAN, highways, and major business corridors for your business growth.',
    image: 'assets/og/home.jpg'
  },

  // ---------- OTHER PAGES ----------

  '/terms': {
    title: 'Terms & Conditions | Mukunda Infraventures',
    image: 'assets/og/home.jpg'
  },

  '/privacy': {
    title: 'Privacy Policy | Mukunda Infraventures',
    image: 'assets/og/home.jpg'
  },

  '/404': {
    title: 'Page Not Found | Mukunda Infraventures',
    image: 'assets/og/home.jpg'
  }
};