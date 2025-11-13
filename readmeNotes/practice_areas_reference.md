[<-- BACK](../README.md)

# Practice Areas JSON Reference

Each practice area in `app/data/practices.json` uses the following structure.  
This section explains the purpose of every key and how it is used throughout the site.

## Top-Level Keys (SEO, Routing, UI)

### `slug`

- Used to generate the URL: `/practice-areas/[slug]`
- Must be unique across all practice areas
- Should be lowercase and hyphenated

### `category`

- Optional grouping label (e.g., “Driving Offenses”, “Violent Crimes”)
- Used for internal organization or future filtering

### `navTitle`

- Short, clean version of the title
- Used in navigation menus, cards, footer links, or “Related Areas”
- Should be concise (e.g., “DWI Defense”)

### `pageTitle`

- The on-page **H1** at the top of the practice page
- Human-readable, descriptive, but not overly optimized

### `metaTitle`

- The `<title>` tag for SEO
- Shown in search results & browser tab
- Can include branding and extra keywords

### `metaDescription`

- `<meta name="description">`
- Short summary used in search engines
- Should encourage click-through and include keywords

### `schemaServiceType`

- Used in JSON-LD as `LegalService.serviceType`
- Helps Google understand what service the page represents

### `tagline`

- Short sentence displayed under the page’s H1
- Provides immediate clarity or urgency

### `heroSummary`

- 2–3 sentence introduction shown near the top of the page

### `audience`

- Who the service is intended for
- Helps with clarity and tone consistency

## FAQ Keys

### `faqTitle`

- Heading for the FAQ section

### `faq`

- Array of `{ q: "", a: "" }` objects
- Generates on-page FAQ + JSON-LD FAQPage schema

## CTA / Conversion Keys

### `ctaLabel`

- Button text for call-to-action

### `ctaBody`

- Supporting CTA paragraph encouraging contact

## Media Keys

### `heroImage`

- URL for the hero image at the top of the page

### `heroImageAlt`

- Alt text for accessibility and SEO

### `icon`

- Optional icon name used in cards or visual elements

## Related Areas

### `relatedAreas`

- Array of slugs for other practice areas
- Used for sidebar / related pages section
- Helps internal linking + topical clustering

# Content Blocks (Modular Page Sections)

`contentBlocks` is an array of modular sections that build the main body of the page.

Each block has a **type** which determines how it renders.

## Common Block Keys

### `type`

- `"section"` → Standard text section
- `"list-section"` → Bullet list section
- `"steps-section"` → Sequential/timeline section

### `image`

- Optional image URL
- Blocks alternate image placement based on index

### `title`

- Section heading

### `body`

- Paragraph text for that section

## Block-Specific Keys

### For `"section"` blocks

```
{
  "type": "section",
  "title": "",
  "body": "",
  "image": ""
}
```

### For `"list-section"` blocks

```
{
  "type": "list-section",
  "title": "",
  "body": "",
  "items": [],
  "image": ""
}
```

### For `"steps-section"` blocks

```
{
  "type": "steps-section",
  "title": "",
  "body": "",
  "steps": [],
  "image": ""
}
```

Each step uses:

```
{
  "title": "",
  "body": "",
  "timeframe": ""
}
```

# Summary Table

| Key                 | Purpose            | Used For            |
| ------------------- | ------------------ | ------------------- |
| `slug`              | URL path           | Routing + Canonical |
| `navTitle`          | Short title        | Nav + Cards         |
| `pageTitle`         | On-page H1         | UX + SEO            |
| `metaTitle`         | `<title>` tag      | SEO                 |
| `metaDescription`   | Search snippet     | SEO                 |
| `schemaServiceType` | JSON-LD            | SEO                 |
| `tagline`           | Sub-headline       | UX                  |
| `heroSummary`       | Intro              | UX                  |
| `audience`          | Who it’s for       | UX                  |
| `faqTitle`          | FAQ header         | UX                  |
| `faq`               | Q&A                | Page + JSON-LD      |
| `ctaLabel`          | Button text        | CTA                 |
| `ctaBody`           | Persuasive copy    | CTA                 |
| `heroImage`         | Visual             | Media               |
| `heroImageAlt`      | Alt text           | SEO/Accessibility   |
| `icon`              | UI icon            | Cards               |
| `relatedAreas`      | Internal links     | SEO                 |
| `contentBlocks`     | Page body sections | UX                  |
| Block `type`        | Section layout     | Rendering           |
| Block `image`       | Section media      | UX                  |
| Block `title`       | Section heading    | UX                  |
| Block `body`        | Section text       | UX                  |
| `items`             | Bullets            | List sections       |
| `steps`             | Timeline items     | Steps sections      |
