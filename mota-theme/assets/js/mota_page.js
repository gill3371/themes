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

try {
  contactButton.onclick = function () {
    modalDiv.style.display = "block";
    if (imgRef) {
      document.querySelector("#reference").value = imgRef.textContent;
    }
  };
} catch (error) {}

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

// Création d'un tableau avec les résultats des filtres de sélection de front-page
const loadButton = document.querySelector(".bt-load-more");
var loadmoreArray = [];

function selectedImg() {
  const categerieValue = document.querySelector("#categorie").value;
  const formatValue = document.querySelector("#format").value;
  const sortingValue = document.querySelector("#sorting").value;
  const moreButton = document.querySelector(".bt-load-more");
  const ajaxurl = moreButton.getAttribute("data-ajaxurl");
  const data = {
    action: moreButton.getAttribute("data-action"),
    nonce: moreButton.getAttribute("data-nonce"),
    categorie: categerieValue,
    format: formatValue,
    sorting: sortingValue,
  };

  fetch(ajaxurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body: new URLSearchParams(data),
  })
    .then((loadArray) => loadArray.json())
    .then((loadArray) => {
      loadmoreArray = loadArray;
      document.querySelector(".galerieContainer").innerHTML = "";
      loadButton.style.display = "block";
      const numberImg = nbrimageToDisplay(0);
      displayImg(0,numberImg);
    });
}

// Calcul du nombre d'images possibles à afficher
function nbrimageToDisplay(imgOffset) {
  const loadmoreArrayLength = loadmoreArray['url'].length;
  if ((imgOffset + 5) > loadmoreArrayLength) {
    numberImg = loadmoreArrayLength - imgOffset;
    loadButton.style.display = "none";
  } else {
    numberImg = 4;
  }
  return numberImg;
}


// Affichage des images dans la DIV Gallerie de la front-page
function displayImg(imgOffset,numberImg) {
  const galerieDiv = document.querySelector(".galerieContainer");
  const imgURL = loadmoreArray['url'];
  const img = loadmoreArray['img'];
  numberImg = nbrimageToDisplay(imgOffset);
  for (i=0; i < numberImg; i++) {
    let imgA = document.createElement("a");
    imgA.href = imgURL[imgOffset];
    imgA.innerHTML = img[imgOffset];
    imgA.setAttribute("data-imgId", imgOffset)
    imgOffset += 1;
    galerieDiv.appendChild(imgA);
  }
}


// Ajout d'images avec la boutton LoadMore
function loadMoreFront() {
  const gallerieDIV = document.querySelector(".galerieContainer");
  const lastImg = gallerieDIV.lastElementChild;
  const lastImgID = lastImg.getAttribute("data-imgId");
  let imgOffset = parseInt(lastImgID) + 1;
  let numberImg = nbrimageToDisplay(imgOffset)
  displayImg(imgOffset,numberImg);
}


// Ajout de toutes les images de la même catégorie dans la page single-photo
var AllImagesArray = [];
const allImagesButton = document.querySelector(".load-more-single");

function SingleAllImages () {
  const ajaxurl = allImagesButton.getAttribute("data-ajaxurl");
  const data = {
    action: allImagesButton.getAttribute("data-action"),
    nonce: allImagesButton.getAttribute("data-nonce"),
    postid: allImagesButton.getAttribute("data-postid"),
    catid: allImagesButton.getAttribute("data-catid"),
  };

  fetch(ajaxurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body: new URLSearchParams(data),
  })
    .then((AllImages) => AllImages.json())
    .then((AllImages) => {
      console.log(AllImages);
      AllImagesArray = AllImages;
      const photoMoreDiv = document.querySelector(".photoMoreBox");
      photoMoreDiv.innerHTML = "";
      const loadmoresingleButton = document.querySelector(".load-more-single");
      loadmoresingleButton.style.display = "none";
      const imgURL = AllImagesArray['url-single'];
      const img = AllImagesArray['img-single'];
      // localStorage.setItem('imgURLSingle', JSON.stringify(imgURL));
      numberImg = AllImagesArray['url-single'].length;
      for (i=0; i < numberImg; i++) {
        let imgA = document.createElement("a");
        imgA.href = imgURL[i];
        imgA.innerHTML = img[i];
        photoMoreDiv.appendChild(imgA);
      }
    });
}

// Affichage des images dans la DIV PhotoMoreBox de la single-photo
function displayImgSingle(imgOffset,numberImg) {
  const photoMoreDiv = document.querySelector(".photoMoreBox");
  const imgURL = AllImagesArray['url-single'];
  const img = AllImagesArray['img-single'];
  numberImg = nbrimageToDisplaySingle(imgOffset);
  for (i=0; i < numberImg; i++) {
    let imgA = document.createElement("a");
    imgA.href = imgURL[imgOffset];
    imgA.innerHTML = img[imgOffset];
    imgA.setAttribute("data-imgId", imgOffset)
    imgOffset += 1;
    photoMoreDiv.appendChild(imgA);
  }
}

// Calcul du nombre d'images possibles à afficher
function nbrimageToDisplaySingle(imgOffset) {
  const ArrayLength = AllImagesArray['url-single'].length;
  if ((imgOffset + 5) > ArrayLength) {
    numberImg = ArrayLength - imgOffset;
    allImagesButton.style.display = "none";
  } else {
    numberImg = 4;
  }
  return numberImg;
}


try {
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
} catch (error) {}

selectedImg();
