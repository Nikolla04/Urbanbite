'use strict';

/**
 * PRELOAD
 */
const preloader = document.querySelector("[data-preload]");

if (preloader) {
  window.addEventListener("load", function () {
    preloader.classList.add("loaded");
    document.body.classList.add("loaded");
  });
}

/**
 * add event listener on multiple elements
 */
const addEventOnElements = function (elements, eventType, callback) {
  if (!elements) return;

  for (let i = 0; i < elements.length; i++) {
    if (elements[i]) {
      elements[i].addEventListener(eventType, callback);
    }
  }
};

/**
 * NAVBAR
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar?.classList.toggle("active");
  overlay?.classList.toggle("active");
  document.body.classList.toggle("nav-active");
};

addEventOnElements(navTogglers, "click", toggleNavbar);

/**
 * HEADER & BACK TOP BTN
 */
const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;

  if (isScrollBottom) {
    header?.classList.add("hide");
  } else {
    header?.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
};

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header?.classList.add("active");
    backTopBtn?.classList.add("active");
    hideHeader();
  } else {
    header?.classList.remove("active");
    backTopBtn?.classList.remove("active");
  }
});

/**
 * HERO SLIDER
 */
const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems.length
  ? heroSliderItems[0]
  : null;

const updateSliderPos = function () {
  if (!heroSliderItems.length) return;

  lastActiveSliderItem?.classList.remove("active");
  heroSliderItems[currentSlidePos]?.classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
};

const slideNext = function () {
  currentSlidePos =
    currentSlidePos >= heroSliderItems.length - 1 ? 0 : currentSlidePos + 1;
  updateSliderPos();
};

const slidePrev = function () {
  currentSlidePos =
    currentSlidePos <= 0 ? heroSliderItems.length - 1 : currentSlidePos - 1;
  updateSliderPos();
};

/**
 * AUTO SLIDE
 */
let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(slideNext, 7000);
};

if (
  heroSlider &&
  heroSliderItems.length &&
  heroSliderNextBtn &&
  heroSliderPrevBtn
) {
  heroSliderNextBtn.addEventListener("click", slideNext);
  heroSliderPrevBtn.addEventListener("click", slidePrev);

  addEventOnElements(
    [heroSliderNextBtn, heroSliderPrevBtn],
    "mouseover",
    () => clearInterval(autoSlideInterval)
  );

  addEventOnElements(
    [heroSliderNextBtn, heroSliderPrevBtn],
    "mouseout",
    autoSlide
  );

  window.addEventListener("load", autoSlide);
}

/**
 * PARALLAX EFFECT
 */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

window.addEventListener("mousemove", function (event) {
  let x = (event.clientX / window.innerWidth) * 10 - 5;
  let y = (event.clientY / window.innerHeight) * 10 - 5;

  x = -x;
  y = -y;

  parallaxItems.forEach((item) => {
    const speed = Number(item.dataset.parallaxSpeed) || 1;
    item.style.transform = `translate3d(${x * speed}px, ${y * speed}px, 0)`;
  });
});

/**
 * TOAST
 */
function showToast(message, type = "success") {
  const toast = document.getElementById("toast");
  if (!toast) return;

  toast.textContent = message;
  toast.className = `toast show ${type}`;

  setTimeout(() => {
    toast.className = "toast";
  }, 3000);
}

/**
 * FORM VALIDATION
 */
const contactForm = document.querySelector(".form-left");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nameInput = contactForm.querySelector('input[name="name"]');
    const phoneInput = contactForm.querySelector('input[name="phone"]');
    const dateInput = contactForm.querySelector(
      'input[name="reservation-date"]'
    );

    nameInput.style.borderColor = "";
    phoneInput.style.borderColor = "";
    dateInput.style.borderColor = "";

    if (!nameInput.value.trim()) {
      nameInput.style.borderColor = "red";
      showToast("Please write your name", "error");
      return;
    }

    if (phoneInput.value.trim().length < 6) {
      phoneInput.style.borderColor = "red";
      showToast("Phone number is wrong", "error");
      return;
    }

    if (!dateInput.value) {
      dateInput.style.borderColor = "red";
      showToast("Please select a reservation date", "error");
      return;
    }

    showToast("Successful reservation, thank you!", "success");

    setTimeout(() => {
      window.location.reload();
    }, 1500);
  });
}

const chefCards = document.querySelectorAll(".chef-card");

  const revealCards = () => {
    const trigger = window.innerHeight * 0.85;

    chefCards.forEach(card => {
      const top = card.getBoundingClientRect().top;
      if (top < trigger) {
        card.classList.add("visible");
      }
    });
  };

  window.addEventListener("scroll", revealCards);
  window.addEventListener("load", revealCards);