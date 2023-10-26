/* 
    @property {HTMLElement} element
    @property {String[]} gallery : Liste des images de la Lightbox
    @property {String} url : URL de l'image affichée
*/
class Lightbox {

  static init() {

    
    const photoContent = document.querySelector(".photoMoreBox");
    photoContent.addEventListener("click", function (e) {
      if (e.target.matches(".card_lightbox")) {
        const photoGallerieDiv = document.querySelector(".photoGallerie");
        const images = Array.from(photoGallerieDiv.querySelectorAll('img[src$=".jpg"]'));
        const gallery = images.map(image => image.getAttribute('src'));
        e.preventDefault();
        let refLightbox = e.target.parentNode;
        refLightbox = refLightbox.querySelector(".card_ref")
        refLightbox = refLightbox.textContent;
        let catLightbox = e.target.parentNode;
        catLightbox = catLightbox.querySelector(".card_cat")
        catLightbox = catLightbox.textContent;
        console.log(catLightbox);
        new Lightbox(e.target.getAttribute("data-url"),refLightbox,catLightbox,gallery);
      }
    })
  }
    
  /* 
        @param {String} url : URL de l'image
        @param {String} ref : Référence de l'image
        @param {String} cat : Catégorie de l'image
        @param {String[]} gallery : Liste des images de la Lightbox

     */
  constructor(url, ref, cat, gallery) {
    this.element = this.buildDOM(url,ref,cat);
    this.gallery = gallery;
    this.loadImage(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  /* 
        @param (url) URL de l'image
     */
  loadImage(url) {
    this.url = null;
    const image = new Image();
    const container = this.element.querySelector(".lightboxContainer");
    container.removeChild(container.lastChild);
    const loader = document.createElement("div");
    loader.classList.add("lightbox_loader");
    container.appendChild(loader);
    image.onload = () => {
      container.removeChild(loader);
      container.appendChild(image);
      this.url = url;
    };
    image.src = url;
  }

  /* 
        @param {mouseEvent} e Ferme la Lightbox
     */
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    }
  }

  /* 
        @param {MouseEvent|KeyboardEvent} e Ferme la Lightbox
     */
  close(e) {
    e.preventDefault;
    this.element.classList.add("fadeOut");
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }

    /* 
        @param {MouseEvent|KeyboardEvent} e Affiche l'image précédente
     */
  prev(e) {
    e.preventDefault;
    let indexImage = this.gallery.findIndex(image => image === this.url);
    console.log(indexImage);
    if (indexImage === 0) {
      indexImage = this.gallery.length;
    }
    this.loadImage(this.gallery[indexImage - 1]);
  }

      /* 
          @param {MouseEvent|KeyboardEvent} e Affiche l'image suivante
      */
  next(e) {
    e.preventDefault;
    let indexImage = this.gallery.findIndex(image => image === this.url);
    console.log(indexImage);
    if (indexImage === this.gallery.length - 1) {
      indexImage = -1;
    }
    this.loadImage(this.gallery[indexImage + 1]);

  }

  /* 
        @param {string} url URL de l'image
        @return {HTMLElement} 
     */
  buildDOM(url,ref,cat) {
    const dom = document.createElement("div");
    dom.classList.add("lightbox");
    dom.innerHTML = `
    <button class="prevLightbox"></button>
    <button class="nextLightbox"></button>
    <button class="closeLightbox"></button>
    <div class="lightboxContainer">
    <span class="refLightbox">${ref}</span>
    <span class="catLightbox">${cat}</span>
    </div>`;
    dom.querySelector(".closeLightbox").addEventListener("click", this.close.bind(this));
    dom.querySelector(".prevLightbox").addEventListener("click", this.prev.bind(this));
    dom.querySelector(".nextLightbox").addEventListener("click", this.next.bind(this));
    return dom;
    }
  }

Lightbox.init();

/* <div class="lightbox">
    <button class="prevLightbox"></button>
    <button class="nextLightbox"></button>
    <button class="closeLightbox"></button>
    <div class="lightboxContainer">
        <img src="https://picsum.photos/900/1800" alt="">
    </div>
</div> */

// <img src="${url}" alt="">
