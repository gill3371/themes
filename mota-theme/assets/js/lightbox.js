
/* 
    @property {HTMLElement} element
*/
class Lightbox {

    static init () {
        const links = document.querySelectorAll(".photoImg img")
        links.forEach(link => link.addEventListener('click', e => {
            e.preventDefault();
            new Lightbox(e.currentTarget.getAttribute('src'));
            })
        )
    }

    /* 
        @param (url) URL de l'image
     */
    constructor(url) {
        this.element = this.buildDOM(url);
        this.loadImage(url);
        this.onKeyUp = this.onKeyUp.bind(this);
        document.body.appendChild(this.element);
        document.addEventListener('keyup', this.onKeyUp);
    }
    
    /* 
        @param (url) URL de l'image
     */
    loadImage(url) {
        const image = new Image();
        const container = this.element.querySelector(".lightboxContainer");
        const loader = document.createElement('div');
        loader.classList.add('lightbox_loader');
        container.appendChild(loader);
        image.onload = function () {
            container.removeChild(loader);
            container.appendChild(image);
        }
        image.src = url;
    }

    /* 
        @param {mouseEvent} e Ferme la Lightbox
     */
    onKeyUp(e) {
        if (e.key === 'Escape') {
            this.close(e);
        }
    }

    /* 
        @param {mouseEvent} e Ferme la Lightbox
     */
    close (e) {
        e.preventDefault;
        this.element.classList.add('fadeOut');
        window.setTimeout (() => {
            this.element.parentElement.removeChild(this.element);
        },500)
        document.removeEventListener('keyup', this.onKeyUp);
    }

    /* 
        @param {string} url URL de l'image
        @return {HTMLElement} 
     */
    buildDOM(url) {
        const dom = document.createElement('div');
        dom.classList.add('lightbox');
        dom.innerHTML = `
            <button class="prevLightbox"></button>
            <button class="nextLightbox"></button>
            <button class="closeLightbox"></button>
            <div class="lightboxContainer"></div>`
        dom.querySelector('.closeLightbox').addEventListener('click', this.close.bind(this));
        return dom;
    }

}

Lightbox.init ();

/* <div class="lightbox">
    <button class="prevLightbox"></button>
    <button class="nextLightbox"></button>
    <button class="closeLightbox"></button>
    <div class="lightboxContainer">
        <img src="https://picsum.photos/900/1800" alt="">
    </div>
</div> */

                // <img src="${url}" alt="">
