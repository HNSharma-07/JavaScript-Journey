/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

/* Menu show */
if (navToggle) {
  navToggle.addEventListener("click", () => {
    navMenu.classList.add("show-menu");
  });
}

/* Menu hidden */
if (navClose) {
  navClose.addEventListener("click", () => {
    navMenu.classList.remove("show-menu");
  });
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll(".nav__link");

const linkAction = () => {
  const navMenu = document.getElementById("nav-menu");
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove("show-menu");
};
navLink.forEach((n) => n.addEventListener("click", linkAction));

/*=============== SHADOW HEADER ===============*/
const shadowHeader = () => {
  const header = document.getElementById("header");
  // When the scroll is greater than 50 viewport height, add the shadow-header class to the header tag
  this.scrollY >= 50
    ? header.classList.add("shadow-header")
    : header.classList.remove("shadow-header");
};
window.addEventListener("scroll", shadowHeader);

/*=============== EMAIL JS ===============*/
const contactForm = document.getElementById("contact-form"),
  contactMessage = document.getElementById("contact-message");

const sendEmail = (e) => {
  e.preventDefault();

  // serviceID - templateID - #form - publicKey
  emailjs
    .sendForm(
      "service_b7oq1gm",
      "template_1lof5qd",
      "#contact-form",
      "AMJWUH_PaZcyahOW2"
    )
    .then(
      () => {
        //show sent message
        contactMessage.textContent = "Message sent successfully ✅";

        // Remove message after five seconds
        setTimeout(() => {
          contactMessage.textContent = "";
        }, 5000);

        // Clear input fields
        contactForm.reset();
      },
      () => {
        // Show error message
        contactMessage.textContent = "Message not sent (service error) ❌";
      }
    );
};

contactForm.addEventListener("submit", sendEmail);

/*=============== SHOW SCROLL UP ===============*/
const scrollUp = () => {
  const scrollUp = document.getElementById("scroll-up");
  // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
  this.scrollY >= 350
    ? scrollUp.classList.add("show-scroll")
    : scrollUp.classList.remove("show-scroll");
};
window.addEventListener("scroll", scrollUp);

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
// const sections = document.querySelectorAll("section[id]");

// const scrollActive = () => {
//   const scrollDown = window.scrollY;

//   sections.forEach((current) => {
//     const sectionHeight = current.offsetHeight,
//       sectionTop = current.offsetTop - 58,
//       sectionId = current.getAttribute("id"),
//       sectionsClass = document.querySelector(
//         ".nav__menu a[href*=" + sectionId + "]"
//       );

//     if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
//       sectionsClass.classList.add("active-link");
//     } else {
//       sectionsClass.classList.remove("active-link");
//     }
//   });
// };
// window.addEventListener("scroll", scrollActive);

/*=============== DARK LIGHT THEME ===============*/
const themeButton = document.getElementById("theme-button");
const darkTheme = "dark-theme";
const iconTheme = "ri-sun-line";

// Previously selected topic (if user selected)
const selectedTheme = localStorage.getItem("selected-theme");
const selectedIcon = localStorage.getItem("selected-icon");

// We obtain the current theme that the interface has by validating the dark-theme class
const getCurrentTheme = () =>
  document.body.classList.contains(darkTheme) ? "dark" : "light";
const getCurrentIcon = () =>
  themeButton.classList.contains(iconTheme) ? "ri-moon-line" : "ri-sun-line";

// We validate if the user previously chose a topic
if (selectedTheme) {
  // If the validation is fulfilled, we ask what the issue was to know if we activated or deactivated the dark
  document.body.classList[selectedTheme === "dark" ? "add" : "remove"](
    darkTheme
  );
  themeButton.classList[selectedIcon === "ri-moon-line" ? "add" : "remove"](
    iconTheme
  );
}

// Activate / deactivate the theme manually with the button
themeButton.addEventListener("click", () => {
  // Add or remove the dark / icon theme
  document.body.classList.toggle(darkTheme);
  themeButton.classList.toggle(iconTheme);
  // We save the theme and the current icon that the user chose
  localStorage.setItem("selected-theme", getCurrentTheme());
  localStorage.setItem("selected-icon", getCurrentIcon());
});

/*=============== SCROLL REVEAL ANIMATION ===============*/
// const sr = ScrollReveal({
//   origin: "top",
//   distance: "60px",
//   duration: 1000,
//   delay: 400,
// });

// sr.reveal(
//   `.home__perfil, .about__image, .skills_t1, .qualification__button, .contact__mail`,
//   { origin: "right" }
// );
// sr.reveal(
//   `.home__name, .home__info, .about__container .section__title-1, .about__info, .skills__container,
//   .contact__social`,
//   { origin: "left" }
// );
// sr.reveal(`.services__card, .qualification__data, .projects__card`, {
//   interval: 100,
// });

/*=============== SEARCH PROJECTS AND PAGINATION ===============*/
let currentPage = 1;

var x = document.getElementsByClassName("projects__card");

function search_project() {
  let input = document.getElementById("searchbar").value.toLowerCase();
  let projectsContainer = document.getElementById("projectsContainer");
  let projects = document.getElementsByClassName("projects__card");
  let found = false;

  for (let i = 0; i < projects.length; i++) {
    const projectName = projects[i]
      .querySelector(".projects__title")
      .innerHTML.toLowerCase();

    const projectDesc = projects[i]
      .querySelector(".projects__description")
      .innerHTML.toLowerCase();

    if (!projectName.includes(input) && !projectDesc.includes(input)) {
      projects[i].style.display = "none";
    } else {
      projects[i].style.display = "block";
      found = true;
    }
  }

  let existingMessage = document.getElementById("noProjectMessage");
  if (existingMessage) {
    existingMessage.remove();
  }

  if (!found) {
    let noProjectMessage = document.createElement("h1");
    noProjectMessage.id = "noProjectMessage";
    noProjectMessage.style.textAlign = "center";
    noProjectMessage.innerHTML = "No project found";
    projectsContainer.appendChild(noProjectMessage);
  }
}

function renderProjects() {
  window.scrollTo({ top: 0, behavior: "smooth" });
  const projectsPerPage = 8;
  const startIndex = (currentPage - 1) * projectsPerPage;
  const endIndex = startIndex + projectsPerPage;

  for (let i = 0; i < x.length; i++) {
    if (i >= startIndex && i < endIndex) {
      x[i].style.display = "block";
    } else {
      x[i].style.display = "none";
    }
  }
}

function goToPage(page) {
  currentPage = page;
  renderProjects();

  const buttons = document.querySelectorAll(".pagination button");
  buttons.forEach((button) => {
    if (button.textContent == currentPage) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

function goToNextPage() {
  if (currentPage < Math.ceil(x.length / 8)) {
    currentPage++;
    renderProjects();
    updateActiveButton();
  }
}

function goToPreviousPage() {
  if (currentPage > 1) {
    currentPage--;
    renderProjects();
    updateActiveButton();
  }
}

function updateActiveButton() {
  const buttons = document.querySelectorAll(".pagination button");
  buttons.forEach((button) => {
    if (parseInt(button.textContent) === currentPage) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
}

/*=============== SHIFTING TABS ===============*/
const homeBtn = document.getElementById("home-btn");
const aboutBtn = document.getElementById("about-btn");
const contributeBtn = document.getElementById("contribute-btn");
const contactBtn = document.getElementById("contact-btn");
const homeSec = document.getElementById("home");
const aboutSec = document.getElementById("about");
const aboutRepoSec = document.getElementById("about-repo");
const contributeSec = document.getElementById("contribute");
const contactSec = document.getElementById("contact");
const paginationSec = document.querySelector(".pagination");

aboutBtn.addEventListener("click", () => {
  aboutBtn.classList.add("active-link");
  homeBtn.classList.remove("active-link");
  contributeBtn.classList.remove("active-link");
  contactBtn.classList.remove("active-link");
  aboutSec.classList.add("active");
  aboutRepoSec.classList.add("active");
  homeSec.classList.remove("active");
  paginationSec.style.display = "none";
  contributeSec.classList.remove("active");
  contactSec.classList.remove("active");
});

homeBtn.addEventListener("click", () => {
  homeBtn.classList.add("active-link");
  aboutBtn.classList.remove("active-link");
  contributeBtn.classList.remove("active-link");
  contactBtn.classList.remove("active-link");
  aboutSec.classList.remove("active");
  aboutRepoSec.classList.remove("active");
  homeSec.classList.add("active");
  paginationSec.style.display = "flex";
  contributeSec.classList.remove("active");
  contactSec.classList.remove("active");
});

contributeBtn.addEventListener("click", () => {
  contributeBtn.classList.add("active-link");
  homeBtn.classList.remove("active-link");
  aboutBtn.classList.remove("active-link");
  contactBtn.classList.remove("active-link");
  aboutSec.classList.remove("active");
  aboutRepoSec.classList.remove("active");
  homeSec.classList.remove("active");
  paginationSec.style.display = "none";
  contributeSec.classList.add("active");
  contactSec.classList.remove("active");
});

contactBtn.addEventListener("click", () => {
  contactBtn.classList.add("active-link");
  homeBtn.classList.remove("active-link");
  aboutBtn.classList.remove("active-link");
  contributeBtn.classList.remove("active-link");
  aboutSec.classList.remove("active");
  aboutRepoSec.classList.remove("active");
  homeSec.classList.remove("active");
  paginationSec.style.display = "none";
  contributeSec.classList.remove("active");
  contactSec.classList.add("active");
});
