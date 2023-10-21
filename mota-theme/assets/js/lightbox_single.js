/* 
    @property {HTMLElement} element
*/
class Lightbox {

  static init() {
    const photoContent = document.querySelector(".photoContent");
    photoContent.addEventListener("click", function (e) {
        if (e.target.closest(".photoImg") || e.target.matches(".card_lightbox")) {
            e.preventDefault();
            const photoImg = e.target.closest(".photoImg");
            if (photoImg) {
              let refLightbox = document.querySelector(".photoRef");
              refLightbox = refLightbox.textContent;
              let catLightbox = document.querySelector(".photoCat");
              catLightbox = catLightbox.textContent;
              new Lightbox(photoImg.getAttribute("data-url"),refLightbox,catLightbox);
            }
            else {
              let refLightbox = e.target.parentNode;
              refLightbox = refLightbox.querySelector(".card_ref")
              refLightbox = refLightbox.textContent;
              let catLightbox = e.target.parentNode;
              catLightbox = catLightbox.querySelector(".card_cat")
              catLightbox = catLightbox.textContent;
              new Lightbox(e.target.getAttribute("data-url"),refLightbox,catLightbox);
            }
        }
    });
  }

  /* 
        @param (url) URL de l'image
        @param (ref) Référence de l'image
        @param (cat) Catégorie de l'image
     */
  constructor(url,ref,cat) {
    this.element = this.buildDOM(url,ref,cat);
    this.loadImage(url);
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }

  /* 
        @param (url) URL de l'image
     */
  loadImage(url) {
    const image = new Image();
    const container = this.element.querySelector(".lightboxContainer");
    const loader = document.createElement("div");
    loader.classList.add("lightbox_loader");
    container.appendChild(loader);
    image.onload = function () {
      container.removeChild(loader);
      container.appendChild(image);
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
        @param {mouseEvent} e Ferme la Lightbox
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
