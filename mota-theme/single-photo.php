<?php get_header(); ?>

<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<div class="photoContent">
			<div class="photoBox">
				<div class="photoInfo">
					<h2 class="photoTitle"><?php the_title(); ?></h2>
					<ul>
						<li>Référence : <span class="photoRef"> <?php the_field('reference_photo') ?></span></li>
						<li>Catégorie : <?php the_terms(get_the_ID(), 'categorie'); ?></li>
						<li>Format : <?php the_terms(get_the_ID(), 'format'); ?></li>
						<li>Type : <?php the_field('photo_type') ?></li>
						<li>Année : <?php the_time('Y'); ?></li>
					</ul>
				</div>
				<div class="photoImg">
					<?php the_post_thumbnail('large'); ?>
				</div>
			</div>
			<section class="contactSection">
				<div class="photoContact">
					<p>Cette photo vous intéresse ?</p>
					<button class="contactButton">Contact</button>
				</div>
				<div class="previewBox">
					<div class="previewImgBox">
						<?php
						if (get_previous_post()) {
							$prev_id = get_previous_post()->ID;
							echo '<img class="previewImg prevImg" src="' . get_the_post_thumbnail_url($prev_id, 'large').'">';
						}
						?>
						<?php
						if (get_next_post()) {
							$next_id = get_next_post()->ID;
							echo '<img class="previewImg nextImg" src="' . get_the_post_thumbnail_url($next_id, 'large').'">';
						}
						?>
					</div>
					<div class="previewArrow">
						<div class="prevArrow">
							<?php previous_post_link('%link', '&#x27F5'); ?>
						</div>
						<div class="nextArrow">
							<?php next_post_link('%link', '&#x27F6'); ?>
						</div>
					</div>
				</div>
			</section>
			<div class="photoMore">
				<p>Vous aimerez aussi</p>
				<div class="photoMoreBox">
					<?php
						$postIDInit = get_the_ID();
						$postCatInit = get_the_terms(get_the_ID(), 'categorie' );
						$catIdInit = $postCatInit[0]->term_id;
						$args = array(
							'post_type' => 'photo',
							'posts_per_page' => 2,
							'orderby' => 'title',
							'order' => 'ASC',
							'post__not_in' => array( $postIDInit ),
							'tax_query' => array(
								array (
									'taxonomy' => 'categorie',
									'field' => 'term_id',
									'terms' => array( $catIdInit ),
									)	
									)
						);

						$loop = new WP_Query($args);

						while ($loop->have_posts()) : $loop->the_post();
							$link = get_the_permalink();
							echo '<a href="' . $link . '">';
							the_post_thumbnail();
							echo '</a>';
						endwhile;

						wp_reset_postdata();
					?>
					<?php
						$postIDStorage = get_the_ID();
						$postCatStorage = get_the_terms(get_the_ID(), 'categorie' );
						$catIdStorage = $postCatStorage[0]->term_id;
						$args = array(
							'post_type' => 'photo',
							'posts_per_page' => -1,
							'orderby' => 'title',
							'order' => 'ASC',
							'post__not_in' => array( $postIDStorage ),
							'tax_query' => array(
								array (
									'taxonomy' => 'categorie',
									'field' => 'term_id',
									'terms' => array( $catIdStorage ),
									)	
									)
						);

						$loop = new WP_Query($args);
						$linksArrayStorage = [];

						while ($loop->have_posts()) : $loop->the_post();
							$linkStorage = get_the_permalink();
							array_push($linksArrayStorage, $linkStorage);
						endwhile;

						wp_reset_postdata();
					?>
					<script>
						let linksStorage = <?php echo json_encode($linksArrayStorage); ?>;
						localStorage.setItem('linksLightbox', JSON.stringify(linksStorage));
					</script>
				</div>
				<button class="load-more-single"
                data-action="mota_load_more_single"
                data-ajaxurl="<?php echo admin_url('admin-ajax.php'); ?>"
                data-nonce="<?php echo wp_create_nonce('mota_load_more_single'); ?>"
					<?php
					$postID = get_the_ID();
					$postCat = get_the_terms(get_the_ID(), 'categorie' );
					$catId = $postCat[0]->term_id;
					?>
				data-postid="<?php echo $postID ?>"
				data-catid="<?php echo $catId ?>"
                onclick="SingleAllImages()">
                Toutes les photos
            </button>

			</div>
		</div>


<?php endwhile;
endif; ?>

<?php get_footer(); ?>