<?php
/** Site header and navigation. */
function neotecx_default_menu() {
    $items = array( array( 'Home', '/' ), array( 'Products', '/products/' ), array( 'Services', '/services/' ), array( 'Industries', '/industries/' ), array( 'About Us', '/about/' ), array( 'Contact', '/contact/' ) );
    echo '<ul class="menu">';
    foreach ( $items as $item ) { echo '<li><a href="' . esc_url( home_url( $item[1] ) ) . '">' . esc_html( $item[0] ) . '</a></li>'; }
    echo '</ul>';
}
?><!doctype html>
<html <?php language_attributes(); ?>><head><meta charset="<?php bloginfo( 'charset' ); ?>"><meta name="viewport" content="width=device-width, initial-scale=1"><?php wp_head(); ?></head>
<body <?php body_class(); ?>><?php wp_body_open(); ?><div class="site-scene" aria-hidden="true"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/ai-data-wave.png' ); ?>" alt=""><div class="scene-overlay"></div></div>
<header class="site-header"><div class="container header-inner"><a class="brand" href="<?php echo esc_url( home_url( '/' ) ); ?>" aria-label="Neotecx home"><img src="<?php echo esc_url( get_template_directory_uri() . '/assets/neotecx-logo.svg' ); ?>" alt="Neotecx"></a><button class="menu-toggle" aria-expanded="false" aria-controls="primary-navigation">Menu</button><nav id="primary-navigation" class="primary-navigation"><?php wp_nav_menu( array( 'theme_location' => 'primary', 'container' => false, 'fallback_cb' => 'neotecx_default_menu' ) ); ?></nav><a class="button header-cta" href="<?php echo esc_url( home_url( '/contact/' ) ); ?>">Get in touch</a></div></header>
