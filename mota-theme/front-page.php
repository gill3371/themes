<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>

        <div class="frontpContainer">
            <div class="photoHero">
                <?php
                $args = array(
                    'post_type' => 'photo',
                    'posts_per_page' => 1,
                    'orderby' => 'rand',
                );

                $loop = new WP_Query($args);

                while ($loop->have_posts()) : $loop->the_post();
                    the_post_thumbnail();
                endwhile;
                wp_reset_postdata();
                ?>
                <h2><?php the_field('titre_hero'); ?></h2>
            </div>
            <div class="filterContainer">
                <div class="filterCol1">
                    <div class="selectBox">
                        <select name="categorie" id="categorie" onchange="newFilter()">
                            <option value="">Catégorie</option>
                            <?php
                            $terms = get_terms('categorie');
                            if (!empty($terms)) {
                                foreach ($terms as $term) {
                                    echo $term->name;
                                    echo '<option value="' . $term->slug . '">' . $term->name . '</option>';
                                }
                            }
                            ?>
                        </select>
                    </div>
                    <div class="selectBox">
                        <select name="format" id="format" onchange="newFilter()">
                            <option value="">Format</option>
                            <?php
                            $termsFormat = get_terms('format');
                            if (!empty($termsFormat)) {
                                foreach ($termsFormat as $term) {
                                    echo $term->name;
                                    echo '<option value="' . $term->slug . '">' . $term->name . '</option>';
                                }
                            }
                            ?>
                        </select>
                    </div>
                </div>
                <div class="filterCol2">
                    <div class="selectBox">
                        <select name="sorting" id="sorting" onchange="newFilter()">
                            <option value="ASC">Tri par</option>
                            <option value="ASC">Les plus récentes</option>
                            <option value="DESC">Les plus anciennes</option>
                        </select>
                    </div>
                </div>
            </div>
           <div class="photoGallerie">
                <div class="photoMoreBox" data-offset = "0">
                </div>
            </div>
            <button class="load-more-page"
                data-action = "mota_load_more_page"
                data-ajaxurl = "<?php echo admin_url('admin-ajax.php'); ?>"
                data-nonce = "<?php echo wp_create_nonce('mota_load_more_page_OK'); ?>"
                onclick = "loadMoreFront()"
                >
                Charger plus
            </button>
        </div>

<?php endwhile;
endif; ?>

<?php get_footer(); ?>