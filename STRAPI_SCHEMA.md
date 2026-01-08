# Strapi CMS Schema Documentation

This document describes the required Strapi content types for the Astro Restaurant Template.

## 📋 Overview

You need to create **3 content types** in your Strapi CMS:

1. **Homepage** - Single Type (one instance)
2. **Menu Items** - Collection Type (multiple instances)
3. **Testimonials** - Collection Type (multiple instances)

## 🏠 Homepage (Single Type)

### Content Type Setup

1. In Strapi Admin, go to **Content-Type Builder**
2. Click **Create new single type**
3. Name it: `homepage`
4. Display name: `Homepage`

### Component: Hero Section

First, create a component for the hero section:

1. Go to **Content-Type Builder** → **Components**
2. Click **Create new component**
3. Category: `sections`
4. Name: `hero-section`
5. Add the following fields:

| Field Name         | Type           | Required | Description               |
| ------------------ | -------------- | -------- | ------------------------- |
| `heroTitle`        | Text (Short)   | Yes      | Main hero heading         |
| `heroSubtitle`     | Text (Long)    | Yes      | Hero subtitle/description |
| `heroImage`        | Media (Single) | No       | Hero background image     |
| `primaryCtaText`   | Text (Short)   | No       | Primary button text       |
| `primaryCtaLink`   | Text (Short)   | No       | Primary button URL        |
| `secondaryCtaText` | Text (Short)   | No       | Secondary button text     |
| `secondaryCtaLink` | Text (Short)   | No       | Secondary button URL      |

### Homepage Fields

Add the following field to the Homepage single type:

| Field Name    | Type                              | Required | Description       |
| ------------- | --------------------------------- | -------- | ----------------- |
| `heroSection` | Component (sections.hero-section) | Yes      | Hero section data |

### Example Content

```json
{
  "heroSection": {
    "heroTitle": "Delicious Food, Made Fresh Daily",
    "heroSubtitle": "Experience the finest culinary creations. We bring authentic flavors and quality ingredients to every dish we serve.",
    "heroImage": <uploaded_image>,
    "primaryCtaText": "View Menu",
    "primaryCtaLink": "/menu",
    "secondaryCtaText": "Order Now",
    "secondaryCtaLink": "/contact"
  }
}
```

## 🍽️ Menu Items (Collection Type)

### Content Type Setup

1. In Strapi Admin, go to **Content-Type Builder**
2. Click **Create new collection type**
3. Name it: `menu-item` (Strapi will pluralize to `menu-items`)
4. Display name: `Menu Item`

### Cuisine Category (Optional)

If you want to categorize menu items by cuisine type:

1. Create another collection type: `cuisine`
2. Add field: `name` (Text, Short, Required)
3. Example cuisines: Italian, Chinese, American, Vegan, etc.

### Menu Item Fields

| Field Name      | Type             | Required | Description                       |
| --------------- | ---------------- | -------- | --------------------------------- |
| `name`          | Text (Short)     | Yes      | Dish name                         |
| `description`   | Text (Long)      | Yes      | Dish description                  |
| `price`         | Number (Decimal) | Yes      | Price in dollars                  |
| `image`         | Media (Single)   | No       | Dish image                        |
| `isMadeToOrder` | Boolean          | No       | Whether dish is made to order     |
| `cuisine`       | Relation         | No       | Many-to-One relation with Cuisine |

### Field Settings

**name:**

- Max length: 100 characters
- Required

**description:**

- Max length: 500 characters
- Required

**price:**

- Number format: Decimal
- Min: 0
- Required

**image:**

- Allowed types: Images only (JPEG, PNG, WebP, SVG)
- Single media

**isMadeToOrder:**

- Default value: false

**cuisine:**

- Relation type: Menu Item has one Cuisine
- Display field: name

### Example Content

```json
{
  "name": "Margherita Pizza",
  "description": "Classic pizza with fresh mozzarella, tomatoes, and basil on a wood-fired crust.",
  "price": 14.99,
  "image": <uploaded_image>,
  "isMadeToOrder": true,
  "cuisine": {
    "name": "Italian"
  }
}
```

## 🔐 API Permissions

Make sure your content types are accessible via the API:

### Public Access (No Authentication)

1. Go to **Settings** → **Users & Permissions Plugin** → **Roles**
2. Click **Public**
3. Under **Permissions**, enable:
   - **Homepage**: `find`
   - **Menu-Items**: `find` and `findOne`
   - **Cuisines** (if using): `find` and `findOne`
4. Click **Save**

### Authenticated Access (With API Token)

If using `STRAPI_API_TOKEN`:

1. Go to **Settings** → **API Tokens**
2. Click **Create new API Token**
3. Name: `Restaurant Website`
4. Token type: `Read-only`
5. Token duration: `Unlimited`
6. Under **Permissions**, enable:
   - **Homepage**: `find`
   - **Menu-Items**: `find` and `findOne`
   - **Cuisines**: `find` and `findOne`
7. Click **Save** and copy the generated token

## 📸 Media Library Setup

### Image Recommendations

**Hero Image:**

- Resolution: 1920x1080 or higher
- Format: JPEG or WebP
- Max size: 2MB

**Menu Item Images:**

- Resolution: 800x800 (square) or 1200x800 (landscape)
- Format: JPEG or WebP
- Max size: 1MB each

### Upload Provider

For production, consider using a cloud storage provider:

- AWS S3
- Cloudinary
- DigitalOcean Spaces

Configure in Strapi's `config/plugins.js` file.

## 🧪 Testing Your Setup

1. **Create content in Strapi:**

   - Fill in the Homepage single type
   - Add at least 3-4 menu items

2. **Test API endpoints:**

   Homepage:

   ```
   GET https://your-strapi.com/api/homepage?populate[heroSection][populate]=heroImage
   ```

   Menu Items:

   ```
   GET https://your-strapi.com/api/menu-items?populate[image][fields][0]=url&populate[cuisine][fields][0]=name
   ```

   Testimonials:

   ```
   GET https://your-strapi.com/api/testimonials?populate=avatar&filters[isFeatured][$eq]=true
   ```

   Testimonials:

   ```
   GET https://your-strapi.com/api/testimonials?populate=avatar&filters[isFeatured][$eq]=true
   ```

3. **Use the debug page:**

   Start your Astro dev server and visit:

   ```
   http://localhost:4321/debug
   ```

   This shows the raw Strapi API response to help troubleshoot.

## ⭐ Testimonials (Collection Type)

### Content Type Setup

1. In Strapi Admin, go to **Content-Type Builder**
2. Click **Create new collection type**
3. Name it: `testimonial` (Strapi will pluralize to `testimonials`)
4. Display name: `Testimonial`

### Testimonial Fields

| Field Name     | Type           | Required | Description                                    |
| -------------- | -------------- | -------- | ---------------------------------------------- |
| `customerName` | Text (Short)   | Yes      | Full name of the customer                      |
| `review`       | Text (Long)    | Yes      | Testimonial text (150-300 characters ideal)    |
| `rating`       | Number (Integer) | Yes    | Star rating from 1 to 5                        |
| `avatar`       | Media (Single) | No       | Customer photo or avatar image                 |
| `title`        | Text (Short)   | No       | Job title or descriptor (e.g., "Regular Customer") |
| `isVerified`   | Boolean        | No       | Show verified badge (for authentic reviews)    |
| `isFeatured`   | Boolean        | No       | Display on homepage (true = show on homepage)  |
| `date`         | Date           | No       | Date of the review                             |

### Field Settings

**customerName:**
- Max length: 100 characters
- Required

**review:**
- Type: Long text
- Max length: 500 characters
- Required
- Recommended: 150-300 characters for best display

**rating:**
- Type: Integer
- Min value: 1
- Max value: 5
- Required
- Default value: 5

**isFeatured:**
- Type: Boolean
- Default value: false
- Note: Only testimonials with `isFeatured: true` will appear on the homepage

**isVerified:**
- Type: Boolean
- Default value: false
- Note: Shows a blue verified checkmark badge next to customer name

### API Permissions

Go to **Settings** → **Roles** → **Public**:

Enable for Testimonial:
- ✅ `find` - Get list of testimonials
- ✅ `findOne` - Get single testimonial

### Example Content

```json
{
  "customerName": "Sarah Johnson",
  "review": "The food was absolutely amazing! The flavors were perfect and the service was exceptional. I'll definitely be coming back soon.",
  "rating": 5,
  "avatar": <uploaded_image>,
  "title": "Regular Customer",
  "isVerified": true,
  "isFeatured": true,
  "date": "2026-01-08"
}
```

### Testimonial Tips

1. **Featured vs All**: Use `isFeatured: true` to showcase the best reviews on your homepage. Keep 3-6 featured testimonials for optimal display.

2. **Avatar Images**: While optional, customer photos make testimonials more authentic. Use profile photos that are:
   - Square format (1:1 aspect ratio)
   - At least 200x200 pixels
   - Clear and professional

3. **Review Length**: Aim for 150-300 characters for best visual balance. Very short reviews lack detail; very long reviews may be truncated on mobile.

4. **Star Ratings**: Be honest with ratings. Mix of 4-5 star reviews is more believable than all 5-star reviews.

5. **Verified Badge**: Use sparingly for reviews you can verify (e.g., from email confirmations, known customers).

## 🔄 Content Workflow

1. **Edit content in Strapi** - Add/update menu items, change hero text
2. **Publish changes** - Make sure content is published (not draft)
3. **Rebuild site** - Run `npm run build` to fetch updated content
4. **Deploy** - Upload the new `dist/` folder to your hosting

## 🚨 Common Issues

### "Endpoint not found" error

- Check that content type names match exactly: `homepage` and `menu-items`
- Verify content types are published in Strapi
- Check API permissions are enabled

### Images not loading

- Ensure images are published in the Media Library
- Check that your Strapi URL is correct in `.env`
- Verify image domain is added to `astro.config.mjs` (for remote images)

### Empty menu items

- Make sure menu items are published (not drafts)
- Check API permissions include `find` for menu-items
- Verify the `populate` parameter in API calls

## 📚 Additional Resources

- [Strapi Documentation](https://docs.strapi.io/)
- [Strapi Content-Type Builder](https://docs.strapi.io/user-docs/content-type-builder)
- [Strapi API Parameters](https://docs.strapi.io/dev-docs/api/rest/parameters)

---

**Need help?** Review the debug page at `/debug` during development to see the actual API responses from Strapi.
