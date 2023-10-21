// Animation bouton burger
let burgerButton = document.querySelector("#bt-burger");
let navMobile = document.querySelector(".nav-header-site");
burgerButton.onclick = function () {
  burgerButton.classList.toggle("open");
  navMobile.classList.toggle("open");
};

// Modale contact
const modalDiv = document.querySelector(".contactModal");
const contactBox = document.querySelector(".contactBox");
const contactButton = document.querySelector(".contactButton");
const contactButtonHeader = document.querySelector(".contactHeader");
const imgRef = document.querySelector(".photoRef");

contactButton.onclick = function () {
  modalDiv.style.display = "block";
  if (imgRef) {
    document.querySelector("#reference").value = imgRef.textContent;
  }
};

contactButtonHeader.onclick = function () {
  modalDiv.style.display = "block";
  document.querySelector("#reference").value = "";
};

// Clic à l'extérieure de la modale pour masquer la modale
window.onclick = function (event) {
  if (event.target == contactBox) {
    modalDiv.style.display = "none";
  }
};

  // Affiche de la preview du post précedent dans single-photo.php
  const prevDiv = document.querySelector(".prevArrow");
  const prevImg = document.querySelector(".prevImg");

  prevDiv.onmouseenter = function () {
    prevImg.classList.add('visible');
  };
  prevDiv.onmouseleave = function () {
    prevImg.classList.remove('visible');
  };

  // Affiche de la preview du post suivant dans single-photo.php
  const nextDiv = document.querySelector(".nextArrow");
  const nextImg = document.querySelector(".nextImg");

  nextDiv.onmouseenter = function () {
    nextImg.classList.add('visible');
  };
  nextDiv.onmouseleave = function () {
    nextImg.classList.remove('visible');
  };

  // Récupération en AJAX du code HTML pour la partie "Toutes les photos"
  function SingleAllImages () {
    const allImagesButton = document.querySelector(".load-more-single")
    const ajaxurl = allImagesButton.getAttribute("data-ajaxurl");
    const data = {
      action: allImagesButton.getAttribute("data-action"),
      nonce: allImagesButton.getAttribute("data-nonce"),
      postid: allImagesButton.getAttribute("data-postid"),
      catid: allImagesButton.getAttribute("data-catid"),
    };
  
    console.log(ajaxurl,data);

    fetch(ajaxurl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "Cache-Control": "no-cache",
      },
      body: new URLSearchParams(data),
    })
      .then((codeHTML) => codeHTML.json())
      .then((codeHTML) => {
        const photoMoreDiv = document.querySelector(".photoMoreBox");
        photoMoreDiv.innerHTML = codeHTML;
        const loadmoresingleButton = document.querySelector(".load-more-single");
        loadmoresingleButton.style.display = "none";
        }
      );
  }  