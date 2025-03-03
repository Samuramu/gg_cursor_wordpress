<?php
function thinkable_enqueue_scripts() {
    $asset_manifest = json_decode(file_get_contents(get_stylesheet_directory() . '/build/asset-manifest.json'), true);
    
    // Enqueue main CSS
    if (isset($asset_manifest['files']['main.css'])) {
        wp_enqueue_style('thinkable-app', get_stylesheet_directory_uri() . '/build' . $asset_manifest['files']['main.css']);
    }

    // Enqueue main JS
    wp_enqueue_script('thinkable-app-js', get_stylesheet_directory_uri() . '/build' . $asset_manifest['files']['main.js'], array(), '1.0', true);
    
    // Pass WordPress data to React
    wp_localize_script('thinkable-app-js', 'wpData', array(
        'apiUrl' => esc_url_raw(rest_url()),
        'nonce' => wp_create_nonce('wp_rest'),
        'baseUrl' => get_site_url(),
        'uploadsUrl' => wp_upload_dir()['baseurl'],
        'themeUrl' => get_stylesheet_directory_uri()
    ));
}
add_action('wp_enqueue_scripts', 'thinkable_enqueue_scripts');

// Add theme support
function thinkable_setup() {
    add_theme_support('title-tag');
    add_theme_support('post-thumbnails');
}
add_action('after_setup_theme', 'thinkable_setup');

// Allow CORS for REST API
function thinkable_cors_headers() {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
    header('Access-Control-Allow-Credentials: true');
}
add_action('init', 'thinkable_cors_headers'); 