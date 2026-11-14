# Neotecx WordPress Theme Guide

This guide describes how to integrate the WordPress theme and what is required for it to match the live Neotecx website at [neotecx.com](https://neotecx.com/) across the full site, not only the homepage.

## Current parity status

The theme package contains a custom homepage and an importer for 24 content routes. The live site currently has six additional industry-detail routes that are not in the imported content bundle. Also, the importer turns Markdown into basic page content and most imported pages use one generic WordPress page template. Installing and importing the package therefore does **not** by itself guarantee a page-for-page visual match.

For full parity, compare every route in the inventory below with the live site, add the missing industry pages, and implement the page-specific layouts and interactions called out here. Treat bundled copy as a starting snapshot; verify it against the current live page before launch.

## Visual system

### Colors and type

| Role | Value | Use |
| --- | --- | --- |
| Page background | `#0D1828` | Main canvas and dark sections |
| Surface | `#142236` | Panels, navigation, and cards |
| Main text | `#E8EDF5` | Headings and primary text |
| Muted text | `#A5B1C0` | Body text, labels, and captions |
| Primary accent | `#79AEBE` | Links, controls, icons, and highlights |
| Warm accent | `#D8BD7D` | Limited emphasis and location details |
| Fine border | `rgba(255,255,255,.12)` | Dividers and panel outlines |

The theme CSS specifies Inter with a system sans-serif fallback. Load the intended font if it is not available on the target WordPress host. Keep headings strong and compact, body copy readable, and uppercase section labels small and restrained. Preserve high contrast; use gold only as a secondary accent.

### Shared layout and shell

- Use a centered content width of about `1152px`, with comfortable responsive side gutters.
- Keep the logo, header, navigation labels, contact call-to-action, and footer consistent on every route.
- Match the live header's desktop dropdown behavior and mobile navigation, including links to product, service, and industry detail pages. The current theme header is a simpler flat menu and needs extending for closer parity.
- Use dark image overlays where text sits over imagery. Keep map captions and other important labels as accessible HTML, not baked into images.
- Use restrained borders, small-radius buttons, and clear content groupings. Avoid applying one generic card grid to sections that have different structures on the live site.
- Keep page-specific interactions keyboard-accessible and provide visible focus. Respect `prefers-reduced-motion`; animate decorative elements with CSS transforms and opacity rather than shifting layout.

## Live page inventory

The route list below reflects the live site reviewed on 2026-11-14. There are 31 public page paths in this inventory: the homepage, 24 routes in the current WordPress importer, and six industry detail routes that still need to be added to the package.

| Page or route family | Live paths | Page-specific content and layout to preserve |
| --- | --- | --- |
| Home | `/` | Global-network hero and live location caption; platform positioning; six pillars; product/platform sections; integrations architecture; proof/case-study cards; company overview; demo/contact section. This is rendered by the theme's custom homepage, not the page importer. |
| Products overview | `/products/` | Six product cards, the shared platform/data-layer architecture, and a closing contact CTA. |
| Product detail pages | `/products/neo-fiber-rollout/`, `/products/site-management/`, `/products/agentic-bots/`, `/products/ticket-management/`, `/products/workforce-management/`, `/products/tower-management/` | Each has its own problem statement, product interface/demo panel, workflow, capabilities, outcomes, and demo CTA. Keep the product mockup and content tailored to that product. |
| Product modules | `/products/site-management/crm/`, `/products/site-management/lead-to-cash/` | Module-specific title and description, with clear navigation back to Site Management and the demo CTA. |
| Services overview | `/services/` | Five-step engagement process, the eight-service capability grid, category controls, and a closing CTA. |
| Service detail pages | `/services/web-commerce/`, `/services/enterprise-java/`, `/services/enterprise-mobility/`, `/services/cloud-platform/`, `/services/iot-solutions/`, `/services/it-consulting/`, `/services/process-automation/`, `/services/data-ai/` | Service-specific problem, capabilities, visual explainer where present, shared five-step process, and contact CTA. |
| Industries overview | `/industries/` | Industry-to-capability comparison and six sector cards. The current importer has placeholder copy here; replace it with the live “One platform, many industries” content. |
| Industry detail pages | `/industries/telecommunications/`, `/industries/manufacturing/`, `/industries/utilities/`, `/industries/oil-gas/`, `/industries/healthcare/`, `/industries/construction/` | **Missing from the current importer.** Add a WordPress page for each sector with its own heading, sector-specific value proposition, relevant products/capabilities, and CTA, matching the corresponding live page. |
| About | `/about/` | Vision/objective, company metrics, milestone timeline, focus areas, and partner CTA. |
| Case studies | `/case-studies/` | Six proof cards, category filters, trust/industry band, and a demo CTA. Preserve filtering and card hierarchy rather than flattening the cards into plain text. |
| Contact | `/contact/` | Demo form, sales email/phone, India and US office details, privacy reassurance, and submission confirmation. The current WordPress template shows a placeholder unless a Contact Form 7 form shortcode is added. |
| Legal | `/privacy/`, `/terms/` | Readable long-form text, clear heading hierarchy, contact link, and the shared footer. Have the legal team review the bundled placeholder language before publishing. |

## Page design and interaction requirements

1. **Keep the shared shell stable.** Use the same logo, navigation, page background, footer columns, and primary CTA site-wide. Set current-page and parent-menu states correctly.
2. **Use a page-specific first viewport.** Each page should open with its own eyebrow/category, heading, concise lead, and relevant image, diagram, or product visual. Do not reuse the homepage hero on every content page.
3. **Preserve section order and content density.** Compare heading hierarchy, whitespace, card count, image placement, and CTAs against the live route. Long pages should retain their distinct sections rather than become a single Markdown column.
4. **Build real controls for interactive sections.** Implement the industries capability map, case-study filters, service category controls, and product-demo tabs/panels as functional and keyboard-operable controls. Static text that only resembles a control is not a match.
5. **Use the right visuals.** Reuse the theme's supplied assets where they correspond to the live page. For missing page imagery or product mockups, add reviewed assets with responsive sizing and descriptive alt text. Do not use decorative image text for essential content.
6. **Make every link resolve on the WordPress site.** Update internal links to local WordPress permalinks; check parent/child routes, footer links, breadcrumbs/back links, CTAs, and mobile menu links.
7. **Finish the contact workflow.** Add and configure a real form plugin or a server-handled form, including validation, spam protection, privacy notice, success/error messages, and delivery testing. Do not leave the theme's placeholder visible on the public site.

## WordPress installation

1. In WordPress, open **Appearance → Themes → Add New → Upload Theme** and upload `neotecx-wordpress-theme.zip`.
2. Activate **Neotecx Classic**.
3. Open **Tools → Import Neotecx Pages** and import the bundled pages. Back up edited pages first: importing again updates pages with matching paths.
4. Create the six missing industry child pages listed above, or add their source content to the importer and package before importing.
5. Create or select the `Home` page, then open **Settings → Reading**, choose **A static page**, and set `Home` as the homepage. Keep its content empty if the theme's custom homepage layout should render.
6. Set permalinks to **Post name** and check that nested page URLs match the route inventory.
7. Under **Appearance → Menus**, create and assign the primary and footer menus. Include the same destinations and nested links as the live site.
8. Configure the contact form, review legal copy, and test the site at desktop and mobile widths before launch.

If the ZIP installer cannot extract the package, unzip it and copy the inner `my-theme` folder into `wp-content/themes/`, then activate it from **Appearance → Themes**.

## Current package limitations to resolve

- The bundled page content contains 24 routes but omits all six industry detail pages.
- The `/industries/` content is placeholder copy and does not match the live capability map and sector listing.
- The homepage is custom-rendered; a non-empty published Home page can switch it to displaying page content instead of the custom homepage sections.
- The generic page template does not reproduce the source site's bespoke page layouts and interactive components. The Markdown importer supports basic headings, paragraphs, lists, emphasis, and links, not complete page structure or behavior.
- The contact template needs a configured form plugin/shortcode or another working form implementation.
- The privacy and terms content is marked as placeholder copy and requires legal review.

## Verification checklist

- [ ] All 31 routes above load directly and have the expected WordPress slug and parent.
- [ ] Compare every route with its live counterpart at desktop and mobile widths.
- [ ] Check headers, footers, navigation state, CTA destinations, and all internal links.
- [ ] Test dropdowns, mobile navigation, filters, product demos, form validation, and form delivery with keyboard and touch.
- [ ] Confirm reduced-motion behavior, focus visibility, color contrast, image loading, and readable page titles.
- [ ] Review the final imported copy and legal language with the Neotecx content owner.

## CSS tokens

```css
:root {
  --background: #0d1828;
  --foreground: #e8edf5;
  --surface: #142236;
  --primary: #79aebe;
  --accent: #d8bd7d;
  --muted: #a5b1c0;
  --border: rgba(255, 255, 255, 0.12);
  --glow: 0 0 24px -8px rgba(121, 174, 190, 0.22);
  --font-sans: "Inter", system-ui, sans-serif;
  --content-width: 1152px;
}
```