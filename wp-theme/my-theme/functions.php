<?php
/** Theme setup, assets, and beginner-friendly homepage settings. */
function neotecx_theme_setup() {
    add_theme_support( 'title-tag' ); add_theme_support( 'post-thumbnails' ); add_theme_support( 'custom-logo' );
    add_theme_support( 'wp-block-styles' ); add_theme_support( 'align-wide' ); add_theme_support( 'responsive-embeds' );
    add_theme_support( 'editor-styles' ); add_editor_style( 'assets/theme.css' );
    register_nav_menus( array( 'primary' => __( 'Primary Menu', 'neotecx' ), 'footer' => __( 'Footer Menu', 'neotecx' ) ) );
}
add_action( 'after_setup_theme', 'neotecx_theme_setup' );
function neotecx_enqueue_assets() {
    wp_enqueue_style( 'neotecx-theme', get_stylesheet_uri(), array(), '1.1.1' );
    wp_enqueue_style( 'neotecx-design', get_template_directory_uri() . '/assets/theme.css', array( 'neotecx-theme' ), '1.1.1' );
    wp_enqueue_script( 'neotecx-interactions', get_template_directory_uri() . '/assets/theme.js', array(), '1.1.1', true );
}
add_action( 'wp_enqueue_scripts', 'neotecx_enqueue_assets' );
function neotecx_customize_register( $wp_customize ) {
    $wp_customize->add_section( 'neotecx_homepage', array( 'title' => __( 'Homepage hero', 'neotecx' ), 'priority' => 30 ) );
    $fields = array(
        'hero_eyebrow' => array( 'Applied AI for critical infrastructure', 'text' ),
        'hero_title' => array( 'The command layer for mission-critical networks.', 'text' ),
        'hero_description' => array( 'Neotecx builds the AI platforms and custom engineering that telecom operators and enterprises run their national-scale rollouts, field operations and assets on.', 'textarea' ),
        'hero_image' => array( '', 'image' ),
    );
    foreach ( $fields as $key => $field ) {
        $sanitize = 'hero_image' === $key ? 'esc_url_raw' : ( 'hero_description' === $key ? 'sanitize_textarea_field' : 'sanitize_text_field' );
        $wp_customize->add_setting( 'neotecx_' . $key, array( 'default' => $field[0], 'sanitize_callback' => $sanitize ) );
        if ( 'image' === $field[1] ) {
            $wp_customize->add_control( new WP_Customize_Image_Control( $wp_customize, 'neotecx_' . $key, array( 'label' => __( 'Hero map image', 'neotecx' ), 'section' => 'neotecx_homepage', 'settings' => 'neotecx_' . $key ) ) );
        } else {
            $wp_customize->add_control( 'neotecx_' . $key, array( 'label' => ucwords( str_replace( '_', ' ', $key ) ), 'section' => 'neotecx_homepage', 'type' => $field[1] ) );
        }
    }

    $wp_customize->add_section( 'neotecx_design', array( 'title' => __( 'Site design', 'neotecx' ), 'priority' => 31 ) );
    $design = array(
        'background' => array( '#0d1828', __( 'Page background', 'neotecx' ) ),
        'surface' => array( '#142236', __( 'Card and panel surface', 'neotecx' ) ),
        'foreground' => array( '#e8edf5', __( 'Main text', 'neotecx' ) ),
        'muted' => array( '#a5b1c0', __( 'Muted text', 'neotecx' ) ),
        'primary' => array( '#79aebe', __( 'Primary accent', 'neotecx' ) ),
        'accent' => array( '#d8bd7d', __( 'Warm accent', 'neotecx' ) ),
        'content_width' => array( '1152', __( 'Content width (px)', 'neotecx' ) ),
    );
    foreach ( $design as $key => $field ) {
        $is_width = 'content_width' === $key;
        $wp_customize->add_setting( 'neotecx_' . $key, array(
            'default' => $field[0],
            'sanitize_callback' => $is_width ? 'absint' : 'sanitize_hex_color',
            'transport' => 'refresh',
        ) );
        if ( $is_width ) {
            $wp_customize->add_control( 'neotecx_' . $key, array(
                'label' => $field[1], 'section' => 'neotecx_design', 'type' => 'number', 'input_attrs' => array( 'min' => 720, 'max' => 1600, 'step' => 16 ),
            ) );
        } else {
            $wp_customize->add_control( new WP_Customize_Color_Control( $wp_customize, 'neotecx_' . $key, array(
                'label' => $field[1], 'section' => 'neotecx_design', 'settings' => 'neotecx_' . $key,
            ) ) );
        }
    }
}
add_action( 'customize_register', 'neotecx_customize_register' );
function neotecx_custom_design_css() {
    $defaults = array( 'background' => '#0d1828', 'surface' => '#142236', 'foreground' => '#e8edf5', 'muted' => '#a5b1c0', 'primary' => '#79aebe', 'accent' => '#d8bd7d' );
    $css = ':root{';
    foreach ( $defaults as $key => $default ) {
        $value = sanitize_hex_color( get_theme_mod( 'neotecx_' . $key, $default ) );
        $css .= '--' . $key . ':' . ( $value ? $value : $default ) . ';';
    }
    $width = absint( get_theme_mod( 'neotecx_content_width', 1152 ) );
    $css .= '--card:var(--surface);--content-width:' . min( 1600, max( 720, $width ? $width : 1152 ) ) . 'px;}';
    wp_add_inline_style( 'neotecx-design', $css );
}
add_action( 'wp_enqueue_scripts', 'neotecx_custom_design_css', 20 );
require_once get_template_directory() . '/functions-data.php';
require_once get_template_directory() . '/import-pages.php';
