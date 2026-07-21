export interface CompanyColors {
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  text: string;
}

export interface AboutUs {
  title: string;
  history: string;
  mission: string;
  vision: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  text: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  address: string;
  schedule: string;
}

export interface CompanyData {
  companyName: string;
  tagline: string;
  description: string;
  colors: CompanyColors;
  aboutUs: AboutUs;
  services: ServiceItem[];
  features: FeatureItem[];
  testimonials: TestimonialItem[];
  contactInfo: ContactInfo;
}
