export interface SeoEntry {
  title?: string;        // nahi diya to page ka purana title rahega
  description?: string;  // nahi diya to page ka purana description rahega
  image?: string;        // OG preview image (jpg/png, WebP nahi), 1200x630
}

// Key = page ka URL path (bina trailing slash ke)
export const SEO_DATA: Record<string, SeoEntry> = {

  // ---------- MAIN PAGES ----------

  '/': {
    description: 'Explore residential and commercial properties in Nagpur with Mukunda Infraventures, offering quality projects, prime locations, and smart investment opportunities.',
    image: 'assets/og/home.jpg'
  },

  '/discover': {
    image: 'assets/og/home.jpg'
  },

  '/aboutus': {
    image: 'assets/og/home.jpg'
  },

  '/projects': {
    image: 'assets/og/home.jpg'
  },

  '/contacts': {
    image: 'assets/og/home.jpg'
  },

  '/blog': {
    image: 'assets/og/blog.jpg'
  },

  '/career': {
    image: 'assets/og/home.jpg'
  },

  '/faq': {
    description: 'Explore residential plots in Nagpur with details on prices, RERA, NMRDA and NIT approvals, plot loans, legal documents, Mukunda projects, and site visits.',
    image: 'assets/og/home.jpg'
  },

  // ---------- PROJECTS ----------

  '/karmabhumi': {
    image: 'assets/og/karmabhumi.jpg'
  },

  '/ayodhya': {
    image: 'assets/og/ayodhya.jpg'
  },

  '/vraj': {
    description: 'Explore residential plots for sale in Nagpur at Vraj by Mukunda Infraventures, ideal for building your dream home and securing your future.',
    image: 'assets/og/vraj.jpg'
  },

  '/dwarka': {
    image: 'assets/og/dwarka.jpg'
  },

  '/keshavam-city-7': {
    image: 'assets/og/home.jpg'
  },

  '/keshavam-city-9': {
    image: 'assets/og/keshavam-city-9.jpg'
  },

  '/keshavam-city-10': {
    image: 'assets/og/keshavam-city-10.jpg'
  },

  // ---------- LOCATION (sub pages) ----------

  '/location': {
    title: 'Commercial Plots in Nagpur | Prime Land & Warehousing',
    image: 'assets/og/home.jpg'
  },

  '/location/plots-in-nagpur': {
    description: 'Explore commercial plots in Nagpur for warehouses, factories, offices, and investment near MIHAN, Bhandara Road, and Samruddhi Highway.',
    image: 'assets/og/home.jpg'
  },

  '/location/warehouses-in-nagpur': {
    description: 'Explore commercial warehouse plots in Nagpur with excellent connectivity to MIHAN, highways, and major business corridors for your business growth.',
    image: 'assets/og/home.jpg'
  }
};