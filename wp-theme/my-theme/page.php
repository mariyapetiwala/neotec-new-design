<?php get_header(); ?>
<main class="page-content page-main container">
    <?php while ( have_posts() ) : the_post(); ?>
        <article class="page-shell">
            <header class="page-heading">
                <span class="page-heading-kicker"><?php esc_html_e( 'Neotecx', 'neotecx' ); ?></span>
                <h1><?php the_title(); ?></h1>
            </header>
            <div class="entry-content">
                <?php the_content(); ?>
                <?php if ( is_page( 'contact' ) && ! has_shortcode( get_the_content(), 'contact-form-7' ) ) : ?>
                    <div class="cf7-placeholder"><?php esc_html_e( 'Add your Contact Form 7 shortcode in the editor to display the contact form.', 'neotecx' ); ?></div>
                <?php endif; ?>
            </div>
        </article>
    <?php endwhile; ?>
</main>
<?php get_footer(); ?>
