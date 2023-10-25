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
const contactButtonHeader = document.querySelector(".contactHeader");
const imgRef = document.querySelector(".photoRef");

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

function loadmorebuttonDisplay(offset,totalposts) {
  const loadmoresingleButton = document.querySelector(".load-more-page");
  if (offset >= totalposts) {
      loadmoresingleButton.style.display = "none";
    }
    else {
    loadmoresingleButton.style.display = "block";
  }
}

// Requête AJAX pour ajouter le code HTML pour les images suivantes
function loadMoreFront () {
  const photoMoreInfos = document.querySelector(".photoMoreBox");
  let offset =  photoMoreInfos.getAttribute("data-offset");
  const totalposts  = photoMoreInfos.getAttribute("data-totalposts");
  // let poststoDisplay = posttoDisplay (offset, totalposts);
  const loadmoreButton = document.querySelector(".load-more-page");
  const ajaxurl = loadmoreButton.getAttribute("data-ajaxurl");
  const data = {
    action: loadmoreButton.getAttribute("data-action"),
    nonce: loadmoreButton.getAttribute("data-nonce"),
    categorie: document.querySelector("#categorie").value,
    format: document.querySelector("#format").value,
    order: document.querySelector("#sorting").value,
    offset: offset,
  };

  fetch(ajaxurl, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      "Cache-Control": "no-cache",
    },
    body: new URLSearchParams(data),
  })
    .then((retourAjax) => retourAjax.json())
    .then((retourAjax) => {
      const photoMoreDiv = document.querySelector(".photoMoreBox");
      photoMoreDiv.innerHTML += retourAjax['code'];
      offset = parseInt(offset) + 8;
      photoMoreInfos.setAttribute("data-offset",offset);
      loadmorebuttonDisplay (offset, retourAjax['total']);
      }
    )
    .catch((error) => {
      console.error("Une erreur s'est produite lors de la requête AJAX : " + error);
    })
}  

function newFilter() {
  const photomoreDiv = document.querySelector(".photoMoreBox");
  photomoreDiv.innerHTML = '';
  photomoreDiv.setAttribute('data-offset',"0");
  loadMoreFront();
}

window.addEventListener("load", loadMoreFront());