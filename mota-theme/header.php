<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,200;0,300;0,500;0,700;1,200;1,300;1,500;1,700&family=Space+Mono:ital,wght@0,400;0,700;1,400;1,700&display=swap" rel="stylesheet">
  <title><?php bloginfo('name'); ?> - <?php the_title(); ?></title>
  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
  <?php wp_body_open(); ?>
  <header class="header">
    <div class="nav-header">
      <div class="top-header">
        <a href="<?php echo home_url('/'); ?>">
          <img class="logoMenu" src="<?php echo get_template_directory_uri(); ?>/assets/img/logo_mota.svg" alt="Logo de Nathalie Mota">
        </a>
        <div id="bt-burger">
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <nav class="nav-header-site">
        <?php
        $arg = array(
          'theme_location' => 'main-menu',
          'container' => null,
        );
        wp_nav_menu($arg);
        ?>
      </nav>
    </div>
  </header>