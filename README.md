# YumYum

A production-ready, fully-featured Astro website for the YumYum restaurant. Built with Astro 5+, integrated with Strapi CMS for easy content management and styled with Tailwind CSS for beautiful, responsive design.

## ✨ Features

- 🚀 **Astro 5+** - Lightning-fast static site generation
- 🎨 **Tailwind CSS** - Beautiful, customizable styling
- 📱 **Fully Responsive** - Works perfectly on all devices
- 🔧 **Strapi CMS Integration** - Easy content management
- 🖼️ **Build-time Image Optimization** - Images downloaded locally during build
- 📄 **Multiple Pages** - Home, Menu, About, Contact
- 📮 **Contact Form** - Formspree integration ready
- 🎯 **SEO Ready** - Optimized for search engines
- ⚡ **TypeScript Support** - Full type safety
- 🎨 **Easy Customization** - Well-documented and themeable

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- A Strapi CMS instance (see Strapi Setup below)

### Installation

1. **Clone this repository**

   ```bash
   git clone <your-repo-url>
   cd yumyum-astro
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```env
   PUBLIC_STRAPI_URL=https://your-strapi-instance.com
   STRAPI_API_TOKEN=your-optional-api-token
   ```

   ⚠️ **Important:** The `PUBLIC_STRAPI_URL` environment variable is **required** for builds to succeed. Without it, `npm run build` will fail with an error. Make sure you have a running Strapi instance before building.

4. **Run the development server**

   ```bash
   npm run dev
   ```

   Visit `http://localhost:4321` to see your site!

5. **Build for production**

   ```bash
   npm run build
   ```

   The static site will be generated in the `dist/` folder.

6. **Preview the production build**
   ```bash
   npm run preview
   ```

## 📋 Strapi Setup

This template requires a Strapi CMS instance with specific content types. See [STRAPI_SCHEMA.md](STRAPI_SCHEMA.md) for detailed setup instructions.

### Quick Overview

You need two content types in Strapi:

1. **Homepage** (Single Type) - Contains hero section data
2. **Menu Items** (Collection Type) - Contains restaurant menu items

## 🎨 Customization

See [CUSTOMIZATION.md](CUSTOMIZATION.md) for a complete guide on customizing:

- Colors and branding
- Fonts and typography
- Content and copy
- Images and media
- Contact form setup

## 📂 Project Structure

```
/
├── public/
│   └── placeholders/        # Example placeholder images
├── src/
│   ├── components/
│   │   ├── Hero.astro       # Hero section component
│   │   └── SimpleMenuCard.astro  # Menu item card component
│   ├── lib/
│   │   └── strapi.ts        # Strapi API integration
│   └── pages/
│       ├── index.astro      # Homepage
│       ├── menu.astro       # Full menu page
│       ├── about.astro      # About page
│       ├── contact.astro    # Contact page
│       └── debug.astro      # Strapi debug page (development)
├── astro.config.mjs         # Astro configuration
├── tailwind.config.mjs      # Tailwind CSS configuration
├── package.json
└── tsconfig.json
```

## 🌐 Pages

- **/** - Homepage with hero, features, and menu preview
- **/menu** - Full menu display with all items
- **/about** - About page with restaurant story and values
- **/contact** - Contact page with form and location info
- **/debug** - Development page to debug Strapi API responses

## 🔧 Environment Variables

| Variable            | Required | Description                                                |
| ------------------- | -------- | ---------------------------------------------------------- |
| `PUBLIC_STRAPI_URL` | Yes      | Your Strapi instance URL (e.g., `https://your-strapi.com`) |
| `STRAPI_API_TOKEN`  | No       | API token if your Strapi requires authentication           |

## 🎨 Placeholder Content

This template includes placeholder content that should be customized before deployment:

### Images

- `public/placeholders/hero.svg` - Homepage hero section image
- `public/placeholders/about.svg` - About page image
- `public/placeholders/dish-1.svg` to `dish-4.svg` - Menu item placeholder images

### Text Content

- **"Restaurant Name"** - Appears in navigation, footer, and page titles across all pages (should be replaced with "YumYum" or your preferred branding)
- **Contact Information:**
  - Email: `info@restaurant.com` (update to YumYum email)
  - Phone: `(555) 123-4567` (update to YumYum phone)
  - Address: `123 Main Street, City, ST 12345` (update to YumYum address)
- **About Page:** `[Year]` placeholder in "Founded in [Year]" text
- **Contact Page:**
  - `YOUR_FORM_ID` in Formspree form action URL
  - `[Map Placeholder - Add Google Maps embed or similar]` text

See [CUSTOMIZATION.md](CUSTOMIZATION.md) for detailed instructions on replacing all placeholder content.

## 📦 Build Process

This template uses **Static Site Generation (SSG)**:

1. During `npm run build`, all Strapi content is fetched
2. Images are downloaded and saved to `public/uploads/`
3. Static HTML is generated with embedded content
4. The result is a completely static site in `dist/`
5. **After deployment, Strapi can be offline** - the site is self-contained

## 🚀 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions for:

- Vercel
- Netlify
- GitHub Pages
- Other static hosting platforms

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally
- `npm run astro` - Run Astro CLI commands

## 🤝 Contributing

This is a template repository. Feel free to fork and customize for your own projects!

## 📄 License

This template is free to use for personal and commercial projects.

## 🆘 Support

- Check [CUSTOMIZATION.md](CUSTOMIZATION.md) for customization help
- Review [STRAPI_SCHEMA.md](STRAPI_SCHEMA.md) for Strapi setup
- See [DEPLOYMENT.md](DEPLOYMENT.md) for deployment guidance

## 🎯 About YumYum

YumYum is a modern restaurant website built with cutting-edge web technologies. This project showcases:

- Fast, static site generation with Astro
- Headless CMS integration with Strapi
- Responsive design that works on all devices
- Easy content management for restaurant staff
- Optimized performance and SEO

Perfect for restaurants, cafes, bakeries, food trucks, catering services, and any food business website.

---

**Ready to customize your YumYum website?** Start by customizing the colors in `tailwind.config.mjs` and updating the content in the page files!
