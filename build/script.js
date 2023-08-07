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
