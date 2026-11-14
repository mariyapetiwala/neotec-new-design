<?php get_header(); ?>
<main class="page-content page-main container">
    <?php while ( have_posts() ) : the_post(); ?>
        <article class="page-shell">
            <header class="page-heading">
                <span class="page-heading-kicker"><?php echo esc_html( get_the_date() ); ?></span>
                <h1><?php the_title(); ?></h1>
            </header>
            <div class="entry-content"><?php the_content(); ?></div>
        </article>
    <?php endwhile; ?>
</main>
<?php get_footer(); ?>
