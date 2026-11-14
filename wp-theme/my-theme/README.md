# Neotecx Classic WordPress Theme

This package converts the project's visual design, media, homepage, and secondary route content into a classic WordPress theme. WordPress owns the pages after import: you can edit their content in the block editor. The React/Vite source is not needed to run the WordPress site.

## Install

1. In WordPress, open **Appearance → Themes → Add New → Upload Theme** and upload `neotecx-wordpress-theme.zip`.
2. Activate **Neotecx Classic**.
3. Open **Tools → Import Neotecx Pages** and import the bundled pages.
4. Open **Settings → Reading**, select **A static page**, and choose **Home** as the homepage.
5. Open **Pages → Home**. It initially shows the theme homepage. Add Gutenberg blocks and publish to replace the starter homepage layout with your editable block layout.

If the ZIP installer reports that it cannot copy files, unzip the package on your computer and copy the inner `my-theme` folder into your Local site at `app/public/wp-content/themes/`, then activate it in WordPress. This avoids the host's ZIP extraction path.

## Customize

- **Appearance → Customize → Site design:** change colors and content width.
- **Appearance → Customize → Homepage hero:** edit hero heading, intro, and image.
- **Appearance → Customize → Site Identity:** set the logo and site title.
- **Pages:** edit imported secondary pages in the WordPress block editor.
- **Appearance → Menus:** manage the primary and footer navigation.
- **Tools → Import Neotecx Pages:** re-import bundled route content. Re-importing updates pages with matching slugs, so export/backup any edits before running it again.

The theme includes the original visual assets, responsive layouts, mobile navigation, reduced-motion support, and WordPress page, post, menu, logo, and block-editor templates.
