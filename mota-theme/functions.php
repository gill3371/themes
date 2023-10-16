<?php
// Ajouter la prise en charge des images mises en avant
add_theme_support('post-thumbnails');

//Chargement des styles et script
function add_styles_mota()
{
    wp_enqueue_style('styles_mota', get_template_directory_uri() . '/assets/css/styles_mota.css');
}
add_action('wp_enqueue_scripts', 'add_styles_mota');

function add_scripts_mota()
{
    wp_enqueue_script('mota-script', get_template_directory_uri() . '/assets/js/mota.js');
    wp_enqueue_script('lightbox-mota', get_template_directory_uri() . '/assets/js/lightbox.js');
}
add_action('wp_enqueue_scripts', 'add_scripts_mota');

// Ajout de la propriétée DEFER aux scripts 
function add_defer_attribute($tag, $handle) 
{
    $scripts_with_defer = ['mota-script', 'lightbox-mota'];
    if (in_array($handle, $scripts_with_defer)) {
        return str_replace(' src', ' defer="defer" src', $tag);
    }
    
    return $tag;
}

add_filter('script_loader_tag', 'add_defer_attribute', 10, 2);

// Création des menus
function register_menus()
{
    register_nav_menus(
        array(
            'main-menu' => 'Main Menu',
            'footer-menu' => 'Footer Menu',
        )
    );
}
add_action('init', 'register_menus');

