
<?php get_header(); ?>

<main class="scene-content">

    <?php if ( have_posts() ) : while ( have_posts() ) : the_post(); ?>

        <?php
        $is_elementor_edit = (
            class_exists( '\Elementor\Plugin' ) &&
            \Elementor\Plugin::$instance->editor->is_edit_mode()
        );

        if ( $is_elementor_edit || trim( get_the_content() ) ) :
        ?>

            <article class="page-content container">
                <div class="entry-content">
                    <?php the_content(); ?>
                </div>
            </article>

        <?php else : ?>

            <?php get_template_part( 'template-parts/home/hero' ); ?>
            <?php get_template_part( 'template-parts/home/marquee' ); ?>

            <section id="platform" class="section container">
                <header class="section-head">
                    <span>PRODUCTS</span>
                    <h2>Six products. One operating picture.</h2>
                    <p>Each platform runs standalone or together, sharing one real-time data layer across planning, build and operations.</p>
                </header>

                <div class="card-grid three">
                    <?php foreach ( neotecx_products() as $product ) : ?>
                        <a class="glass card" href="<?php echo esc_url( home_url( '/products/' . $product['slug'] . '/' ) ); ?>">
                            <h3><?php echo esc_html( $product['name'] ); ?></h3>
                            <p><?php echo esc_html( $product['desc'] ); ?></p>
                            <span class="link-label">View product →</span>
                        </a>
                    <?php endforeach; ?>
                </div>
            </section>

            <?php get_template_part( 'template-parts/home/pillars' ); ?>
            <?php get_template_part( 'template-parts/home/industries' ); ?>
            <?php get_template_part( 'template-parts/home/services' ); ?>
            <?php get_template_part( 'template-parts/home/architecture' ); ?>
            <?php get_template_part( 'template-parts/home/company' ); ?>
            <?php get_template_part( 'template-parts/home/products' ); ?>
            <?php get_template_part( 'template-parts/home/contact-cta' ); ?>

        <?php endif; ?>

    <?php endwhile; endif; ?>

</main>

<?php get_footer(); ?>
