<div class="contactModal">
    <div class="contactBox">
        <div class="contactContent">
            <img class="contactLogo" src="<?php echo get_template_directory_uri() . '/assets/img/contact_header.svg' ?>" alt="Logo Contact entête du formulaire">
            <form class="contactForm" action="" method="post">
                <ul>
                    <li>
                        <label class="contactLabel" for="name">Nom&nbsp;:</label>
                        <input type="text" id="name" name="user_name" />
                    </li>
                    <li>
                        <label class="contactLabel" for="mail">E-mail&nbsp;:</label>
                        <input type="email" id="mail" name="user_mail" />
                    </li>
                    <li>
                        <label class="contactLabel" for="reference">Réf. photo&nbsp;:</label>
                        <input type="text" id="reference" name="photo_ref" />
                    </li>
                    <li>
                        <label class="contactLabel" for="msg">Message&nbsp;:</label>
                        <textarea id="msg" name="user_message"></textarea>
                    </li>
                </ul>
                <button type="submit">Envoyer</button>
            </form>
        </div>
    </div>
</div>