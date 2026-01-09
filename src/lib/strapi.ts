// Strapi API Configuration
// Validate that STRAPI_URL is set at build time
const STRAPI_URL = import.meta.env.PUBLIC_STRAPI_URL;
const STRAPI_TOKEN = import.meta.env.STRAPI_API_TOKEN;

if (!STRAPI_URL) {
  console.warn(
    '⚠️  PUBLIC_STRAPI_URL not set - using placeholder content for preview.\n' +
    'Set PUBLIC_STRAPI_URL in your .env file to fetch real content from Strapi.\n' +
    'Example: PUBLIC_STRAPI_URL=https://your-strapi-instance.com'
  );
}

// TypeScript Interfaces
export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiImageData {
  id: number;
  attributes: {
    url: string;
    alternativeText?: string;
    width: number;
    height: number;
    formats?: {
      thumbnail?: StrapiImageFormat;
      small?: StrapiImageFormat;
      medium?: StrapiImageFormat;
      large?: StrapiImageFormat;
    };
  };
}

export interface StrapiImage {
  data: StrapiImageData | null;
}

export interface CategoryData {
  id: number;
  attributes: {
    name: string;
  };
}

export interface CategoryRelation {
  data: CategoryData | null;
}

export interface SizeVariant {
  id: number;
  size: string;
  price: number;
}

export interface MenuItemAttributes {
  name: string;
  description?: string;
  sizeVariant?: SizeVariant[];
  price?: number;
  isMadeToOrder: boolean;
  image: StrapiImage;
  category?: CategoryRelation;
  cuisine?: CategoryRelation; // Backward compatibility
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface MenuItem {
  id: number;
  attributes: MenuItemAttributes;
}

// Testimonial Types
export interface TestimonialAttributes {
  customerName: string;
  review: string;
  rating: number; // 1-5
  date?: string;
  avatar?: StrapiImage;
  title?: string;
  isVerified?: boolean;
  isFeatured?: boolean;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface Testimonial {
  id: number;
  attributes: TestimonialAttributes;
}

export interface StrapiResponse<T> {
  data: T[];
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Homepage Hero Section Types
export interface HeroSection {
  heroTitle: string;
  heroSubtitle: string;
  heroImage: StrapiImage;
  primaryCtaText?: string;
  primaryCtaLink?: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
}

export interface HomepageAttributes extends HeroSection {
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
}

export interface HomepageResponse {
  data: {
    id: number;
    attributes: HomepageAttributes;
  } | null;
  meta?: Record<string, unknown>;
}

export async function fetchStrapi<T = MenuItem>(endpoint: string): Promise<StrapiResponse<T>> {
  if (!STRAPI_URL) {
    return { data: [], meta: {} };
  }
  
  // Check if endpoint already has query parameters
  const separator = endpoint.includes('?') ? '&' : '?';
  const defaultPopulate = endpoint.includes('populate') 
    ? '' 
    : `${separator}populate[image][fields][0]=url&populate[image][fields][1]=alternativeText&populate[image][fields][2]=formats&populate[cuisine][fields][0]=name&populate[category][fields][0]=name&populate=sizeVariant`;
  
  const url = `${STRAPI_URL}/api/${endpoint}${defaultPopulate}`;
  
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    // Add authentication if token is available
    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }
    
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      // Provide specific error messages based on status code
      if (response.status === 404) {
        throw new Error(`Endpoint not found: ${endpoint}`);
      }
      if (response.status === 401) {
        throw new Error('Authentication required. Please check your API token.');
      }
      if (response.status === 403) {
        throw new Error('Access forbidden. Your API token may not have the required permissions.');
      }
      if (response.status >= 500) {
        throw new Error('Strapi server error. Please try again later.');
      }
      throw new Error(`Failed to fetch from Strapi: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    // Only log in development mode
    if (import.meta.env.DEV) {
      console.error('Strapi fetch error:', error);
    }
    // Return empty data instead of throwing - allows graceful fallback
    return { data: [], meta: {} };
  }
}

// Fetch single type (like homepage)
export async function fetchStrapiSingle(endpoint: string): Promise<HomepageResponse> {
  if (!STRAPI_URL) {
    return { data: null, meta: {} };
  }
  const url = `${STRAPI_URL}/api/${endpoint}?populate=heroImage`;
  
  try {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (STRAPI_TOKEN) {
      headers['Authorization'] = `Bearer ${STRAPI_TOKEN}`;
    }
    
    const response = await fetch(url, { headers });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`Endpoint not found: ${endpoint}`);
      }
      if (response.status === 401) {
        throw new Error('Authentication required. Please check your API token.');
      }
      if (response.status === 403) {
        throw new Error('Access forbidden. Your API token may not have the required permissions.');
      }
      if (response.status >= 500) {
        throw new Error('Strapi server error. Please try again later.');
      }
      throw new Error(`Failed to fetch ${endpoint}: ${response.statusText}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    if (import.meta.env.DEV) {
      console.error('Strapi fetch error:', error);
    }
    // Return null data instead of throwing - allows graceful fallback
    return { data: null, meta: {} };
  }
}

// Download image from Strapi and save it locally during build
export async function downloadStrapiImage(url: string | undefined | null): Promise<string | null> {
  if (!url) return null;
  
  // If it's a relative URL, make it absolute
  const fullUrl = url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
  
  // Extract filename from URL
  const urlPath = new URL(fullUrl).pathname;
  const filename = urlPath.split('/').pop();
  
  if (!filename) return null;
  
  try {
    // Download the image
    const response = await fetch(fullUrl);
    if (!response.ok) {
      console.error(`Failed to download image: ${fullUrl}`);
      return fullUrl; // Fallback to remote URL
    }
    
    // Get the image buffer
    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    
    // Create uploads directory if it doesn't exist
    const fs = await import('fs');
    const path = await import('path');
    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    
    // Save the image
    const localPath = path.join(uploadsDir, filename);
    fs.writeFileSync(localPath, buffer);
    
    // Return the local path (relative to public folder)
    return `/uploads/${filename}`;
  } catch (error) {
    console.error(`Error downloading image ${fullUrl}:`, error);
    return fullUrl; // Fallback to remote URL on error
  }
}

export function getStrapiMedia(url: string | undefined | null) {
  if (!url) return null;
  
  // If the URL is already absolute, return it
  if (url.startsWith('http')) {
    return url;
  }
  
  // Otherwise, prepend the Strapi URL
  return `${STRAPI_URL}${url}`;
}
