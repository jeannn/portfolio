'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });






// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables 
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  // dictionnaire pour convertir le français vers l’anglais
  const translationMap = {
    //cle : valeur 
    "tout": "all",
    "jeu": "game",
    "applications": "applications",
    "développement web": "web development",
    "developpement web": "web development" // au cas où sans accent
  };

  // attribut a selectedvalue la cle associe a la valeur oubien la cle elle meme si cest deja la cle qui est donnee
  selectedValue = translationMap[selectedValue] || selectedValue;

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category.toLowerCase()) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }
};


// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


//nav menus
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

navigationLinks.forEach(link => {
  link.addEventListener("click", () => {
    const targetPage = link.dataset.page; // get page name from button

    // toggle active page
    pages.forEach(page => {
      page.classList.toggle("active", page.dataset.page === targetPage);
    });

    // toggle active nav link
    navigationLinks.forEach(btn => {
      btn.classList.toggle("active", btn === link);
    });

    window.scrollTo(0, 0);
  });
});

//contact form prevent the page to redirect to the formspree page after submitting
const form = document.getElementById('contact-form');
  const status = document.getElementById('form-status');

  form.addEventListener('submit', async (event) => {
    event.preventDefault(); // prevent redirect
    const data = new FormData(form);
    const action = form.action;
    const response = await fetch(action, {
      method: form.method,
      body: data,
      headers: {
        'Accept': 'application/json'
      }
    });
    if (response.ok) {
      status.style.display = 'block';
      status.textContent = 'Message sent successfully! 🎉';
      form.reset();
    } else {
      status.style.display = 'block';
      status.textContent = 'Oops! There was a problem sending your message.';
    }
  });
