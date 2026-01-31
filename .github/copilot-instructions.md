# YumYum Astro + Strapi Restaurant Template

## Project Overview

This is an **Astro 5+ static site** integrated with a **Strapi CMS backend**. The site fetches all content at **build time** (SSG - Static Site Generation), downloads images locally, and generates pure static HTML. The deployed site requires no runtime connection to Strapi.

**Key Architecture Pattern**: Build-time data fetching (not SSR, not client-side). All `fetchStrapi()` calls execute during `npm run build`, not at runtime.

## Critical Environment Setup

- **`PUBLIC_STRAPI_URL`** (required): Strapi instance URL. Build fails without it. No Strapi = placeholder content shown.
- **`STRAPI_API_TOKEN`** (optional): For authenticated Strapi endpoints.
- Environment variables go in `.env` at project root.

## Development Workflow

```bash
npm run dev      # Dev server at localhost:4321
npm run build    # Static build - requires PUBLIC_STRAPI_URL
npm run preview  # Preview production build locally
```

**Debug Strapi issues**: Visit `/debug` page (dev only) to inspect raw API responses.

## Strapi Integration (`src/lib/strapi.ts`)

### Data Fetching Functions

- **`fetchStrapi<T>(endpoint)`**: Fetch collection types (e.g., `"menu-items"`)
  - Auto-populates images, categories, cuisines, sizeVariant relations
  - Returns empty array on error (graceful fallback)
- **`fetchStrapiSingle(endpoint)`**: Fetch single types (e.g., `"homepage"`)
  - Returns null data on error
- **`downloadStrapiImage(url)`**: Downloads Strapi images to `public/uploads/` during build
  - Returns local path `/uploads/filename.jpg`
  - Fallback to remote URL on failure

### Content Types Required in Strapi

1. **Homepage** (single type) - `heroSection` component with: `heroTitle`, `heroSubtitle`, `heroImage`, CTA fields
2. **Menu Items** (collection) - `name`, `description`, `price`, `isMadeToOrder`, `image`, optional `cuisine`/`category` relation, optional `sizeVariant` component
3. **Testimonials** (collection) - `customerName`, `review`, `rating`, optional `avatar`

See [STRAPI_SCHEMA.md](../STRAPI_SCHEMA.md) for full field definitions.

## Component Patterns

### Astro Component Data Flow

```astro
---
// ✅ Fetch at build time in frontmatter
const menu = await fetchStrapi<MenuItem>("menu-items");
const homepage = await fetchStrapiSingle("homepage");

// ✅ Use fallback defaults when Strapi unavailable
const heroTitle = homepage?.data?.attributes?.heroTitle || "Default Title";
---

<!-- ✅ Render with null checks -->
{menu?.data?.map(item => <SimpleMenuCard item={item} />)}
```

### Image Handling

Always use `downloadStrapiImage()` for build-time image optimization:

```astro
const imageUrl = await downloadStrapiImage(item.attributes.image?.data?.attributes?.url);
```

## Styling & Theming

- **Tailwind CSS** with custom color palette in [tailwind.config.mjs](../tailwind.config.mjs)
- Brand colors: `primary` (coral/red), `accent` (golden yellow), `cream` (neutral warm)
- Font: Poppins (Google Fonts loaded in page `<head>`)
- **Customization guide**: See [CUSTOMIZATION.md](../CUSTOMIZATION.md) for changing colors, fonts, content

## Key Files & Their Purpose

- **`src/lib/strapi.ts`**: All Strapi API logic, TypeScript types, image downloading
- **`src/pages/*.astro`**: Page routes - all fetch data in frontmatter (build-time)
- **`src/components/Hero.astro`**: Dynamic hero using homepage data + image downloading pattern
- **`src/pages/debug.astro`**: Development debugging tool for Strapi connectivity
- **`astro.config.mjs`**: Static output, Tailwind integration
- **`STRAPI_SCHEMA.md`**: Strapi content type field definitions (reference for new content types)

## Common Tasks

**Add new page fetching Strapi data**:

```astro
---
import { fetchStrapi, type MenuItem } from "../lib/strapi";
const data = await fetchStrapi<MenuItem>("your-endpoint");
---
```

**Add new Strapi content type**:

1. Define TypeScript interfaces in `src/lib/strapi.ts` (follow existing `MenuItem`, `Testimonial` patterns)
2. Update populate query in `fetchStrapi()` if relations/images needed
3. Document schema in `STRAPI_SCHEMA.md`

**Handle missing Strapi data**:

- Always use optional chaining: `data?.attributes?.field`
- Provide fallback defaults for critical content
- Build succeeds with placeholder content if `PUBLIC_STRAPI_URL` unset

## Deployment Notes

- Build generates static files in `dist/`
- Images copied to `dist/uploads/` during build
- No server/backend needed after deployment
- Rebuild required to update content (content changes in Strapi require new build)
- See [DEPLOYMENT.md](../DEPLOYMENT.md) for Vercel, Netlify, etc.

## Conventions

- **No runtime API calls** - all Strapi fetching happens at build time
- **Graceful degradation** - components render with defaults if Strapi data missing
- **TypeScript strict types** - all Strapi responses typed (see interfaces in `strapi.ts`)
- **Navigation** - Uses `Navigation.astro` component with `currentPage` prop for active state
- **Reusable components** - Follow `SimpleMenuCard.astro` pattern: typed props, fallback SVG placeholders
