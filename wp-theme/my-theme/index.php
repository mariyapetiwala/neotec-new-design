<?php get_header(); ?>
<main class="page-content page-main container">
    <header class="page-heading">
        <span class="page-heading-kicker"><?php esc_html_e( 'Journal', 'neotecx' ); ?></span>
        <h1><?php esc_html_e( 'Latest posts', 'neotecx' ); ?></h1>
    </header>
    <div class="post-list">
        <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>
            <article class="post-card">
                <p class="post-meta"><?php echo esc_html( get_the_date() ); ?></p>
                <h2><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
                <?php the_excerpt(); ?>
                <a class="post-card-link" href="<?php the_permalink(); ?>"><?php esc_html_e( 'Read article', 'neotecx' ); ?> <span aria-hidden="true">→</span></a>
            </article>
        <?php endwhile; the_posts_pagination(); else : ?>
            <p><?php esc_html_e( 'No posts found.', 'neotecx' ); ?></p>
        <?php endif; ?>
    </div>
</main>
<?php get_footer(); ?>
