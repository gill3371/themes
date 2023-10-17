<div class="photoM">
    <div>
        <?php echo get_the_post_thumbnail(); ?>
    </div>
    <div class="photo_card">
        <span class="card_ref">
            <?php echo get_field('reference_photo'); ?>
        </span>
        <span class="card_cat">
            <?php echo get_the_terms(get_the_ID(), 'categorie')[0]->name; ?>
        </span>
        <a class="card_info" href="<?php echo esc_url(get_permalink()); ?>"></a>
        <span class="card_lightbox" data-url="<?php echo get_the_post_thumbnail_url(get_the_ID(), 'full'); ?>">
        </span>
    </div>
</div>