<?php
/** Add a one-time page importer under Tools. */
function neotecx_add_import_tool() { add_management_page( 'Import Neotecx Pages', 'Import Neotecx Pages', 'manage_options', 'neotecx-import', 'neotecx_import_screen' ); }
add_action( 'admin_menu', 'neotecx_add_import_tool' );
function neotecx_import_screen() {
    if ( ! current_user_can( 'manage_options' ) ) { return; }
    $result = '';
    if ( isset( $_POST['neotecx_import'] ) && check_admin_referer( 'neotecx_import_pages' ) ) {
        $data_file = get_template_directory() . '/page-content.json';
        $pages = file_exists( $data_file ) ? json_decode( file_get_contents( $data_file ), true ) : array();
        $created = array(); $count = 0;
        foreach ( $pages as $slug => $page ) {
            $parent_slug = dirname( $slug );
            $parent = '.' === $parent_slug ? null : get_page_by_path( $parent_slug );
            $parent_id = '.' === $parent_slug ? 0 : ( $created[$parent_slug] ?? ( $parent ? $parent->ID : 0 ) );
            $existing = get_page_by_path( $slug );
            $post = array( 'post_title' => sanitize_text_field( $page['title'] ), 'post_name' => sanitize_title( basename( $slug ) ), 'post_content' => wp_kses_post( neotecx_markdown_to_html( $page['markdown'] ) ), 'post_status' => 'publish', 'post_type' => 'page', 'post_parent' => $parent_id );
            if ( $existing ) { $post['ID'] = $existing->ID; $page_id = wp_update_post( $post, true ); } else { $page_id = wp_insert_post( $post, true ); }
            if ( ! is_wp_error( $page_id ) && $page_id ) { $created[$slug] = $page_id; $count++; }
        }
        if ( ! get_page_by_path( 'home' ) ) {
            $home_id = wp_insert_post( array( 'post_title' => __( 'Home', 'neotecx' ), 'post_name' => 'home', 'post_status' => 'publish', 'post_type' => 'page' ), true );
            if ( ! is_wp_error( $home_id ) && $home_id ) { $count++; }
        }
        $result = sprintf( __( 'Imported or updated %d pages. You can edit each one under Pages.', 'neotecx' ), $count );
    }
    echo '<div class="wrap"><h1>' . esc_html__( 'Import Neotecx Pages', 'neotecx' ) . '</h1><p>' . esc_html__( 'Create editable WordPress pages from the bundled route content. Matching pages are updated on import. A blank Home page is added if one does not exist.', 'neotecx' ) . '</p>';
    if ( $result ) { echo '<div class="notice notice-success"><p>' . esc_html( $result ) . '</p></div>'; }
    echo '<form method="post">'; wp_nonce_field( 'neotecx_import_pages' ); submit_button( __( 'Import pages', 'neotecx' ), 'primary', 'neotecx_import' ); echo '</form></div>';
}
function neotecx_markdown_to_html( $markdown ) {
    $lines = preg_split( '/\r\n|\r|\n/', $markdown ); $html = ''; $paragraph = array(); $list = false;
    foreach ( $lines as $line ) {
        $line = trim( $line );
        if ( '' === $line ) { if ( $paragraph ) { $html .= '<p>' . implode( ' ', $paragraph ) . '</p>'; $paragraph = array(); } if ( $list ) { $html .= '</ul>'; $list = false; } continue; }
        if ( preg_match( '/^#{1,6}\s+/', $line ) ) { if ( $paragraph ) { $html .= '<p>' . implode( ' ', $paragraph ) . '</p>'; $paragraph = array(); } if ( $list ) { $html .= '</ul>'; $list = false; } preg_match( '/^(#+)\s+(.*)$/', $line, $match ); $level = min( 6, strlen( $match[1] ) ); $html .= '<h' . $level . '>' . neotecx_inline_markdown( $match[2] ) . '</h' . $level . '>'; }
        elseif ( preg_match( '/^[-*]\s+/', $line ) ) { if ( ! $list ) { $html .= '<ul>'; $list = true; } $html .= '<li>' . neotecx_inline_markdown( preg_replace( '/^[-*]\s+/', '', $line ) ) . '</li>'; }
        else { if ( $list ) { $html .= '</ul>'; $list = false; } $paragraph[] = neotecx_inline_markdown( $line ); }
    }
    if ( $paragraph ) { $html .= '<p>' . implode( ' ', $paragraph ) . '</p>'; } if ( $list ) { $html .= '</ul>'; }
    return $html;
}
function neotecx_inline_markdown( $text ) {
    $text = esc_html( $text );
    $text = preg_replace( '/\*\*(.+?)\*\*/', '<strong>$1</strong>', $text );
    $text = preg_replace( '/\*(.+?)\*/', '<em>$1</em>', $text );
    return preg_replace_callback( '/\[(.*?)\]\((https?:\/\/[^\s)]+)\)/', function ( $match ) { $url = wp_parse_url( html_entity_decode( $match[2] ) ); $href = isset( $url['host'] ) && 'neotecx.com' === $url['host'] ? ( $url['path'] ?? '/' ) : $match[2]; return '<a href="' . esc_url( $href ) . '">' . $match[1] . '</a>'; }, $text );
}
