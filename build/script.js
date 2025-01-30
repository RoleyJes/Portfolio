"use strict";

// Mobile Side Menu
const sideMenu = document.querySelector("#sideMenu");
const openMenu = document.querySelector("#openMenu");
const closeMenu = document.querySelector("#closeMenu");
const overlay = document.querySelector(".overlay");

const closeSideMenu = function () {
  sideMenu.style.width = "0px";
  overlay.classList.add("hidden");
};

openMenu.addEventListener("click", function () {
  sideMenu.style.width = "70%";
  overlay.classList.remove("hidden");
});

closeMenu.addEventListener("click", closeSideMenu);
overlay.addEventListener("click", closeSideMenu);

// Sticky Navigation
const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) nav.classList.add("sticky");
  else nav.classList.remove("sticky");
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

// Modal form
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".closeModalBtn");
const openModalBtns = document.querySelectorAll(".openModalBtns");
const openModalBtnSide = document.querySelectorAll(".openModalBtnSide");
const backdrop = document.querySelector(".backdrop");

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hide");
  backdrop.classList.remove("hide");
  closeSideMenu();
};

const closeModal = function () {
  modal.classList.add("hide");
  backdrop.classList.add("hide");
};

openModalBtns.forEach((btn) => {
  btn.addEventListener("click", openModal);
});

closeModalBtn.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

// Revealing Elements on Scroll
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.05,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

// Slider
const slider = function () {
  const slides = document.querySelectorAll(".slide");
  const btnLeft = document.querySelector(".slider__btn--left");
  const btnRight = document.querySelector(".slider__btn--right");
  const dotContainer = document.querySelector(".dots");

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    e.key === "ArrowRight" && nextSlide();
  });

  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();

// Lazy load img
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener("load", function () {
    entry.target.classList.remove("lazy-img");
    entry.target.parentElement.classList.remove("lazy-img");
  });

  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgTargets.forEach((img) => imgObserver.observe(img));

// Footer year
const year = document.querySelector(".year");
year.textContent = new Date().getFullYear();
