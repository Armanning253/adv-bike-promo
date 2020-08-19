const track = document.querySelector(".carousel__track");
const slide = Array.from(track.children);
const nextButton = document.querySelector(".carousel__btn--right");
const prevButton = document.querySelector(".carousel__btn--left");
const dotsNav = document.querySelector(".carousel__nav");
const dots = Array.from(dotsNav.children);

const slideWidth = slide[0].getBoundingClientRect().width;

//!---- position slides next to one another ---------
setSlidePosition = (slide, index) => {
  slide.style.left = slideWidth * index + "px";
};
slide.forEach(setSlidePosition);

//!-------- CAROUSEL CALLBACK FUNCTIONS --------
const moveToSlide = (track, currentSlide, targetSlide) => {
  //*move to the next slide
  track.style.transform = "translateX(-" + targetSlide.style.left + ")";
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
};
const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
};
//!---------- TRACK HIDE ARROW -----
const hideArrow = (targetIndex) => {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slide.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
};
//!------- CLICK LEFT, SLIDE LEFT----------
prevButton.addEventListener("click", () => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slide.findIndex((prev) => prev === prevSlide);
  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideArrow(prevIndex);
});
//! --------CLICK RIGHT, SLIDE RIGHT----------
nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slide.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideArrow(nextIndex);
});

//!------------ CLICK DOT NAV MOVE TO SLIDE---

dotsNav.addEventListener("click", (e) => {
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slide[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideArrow(targetIndex); //slide, prevButton, nextButton,
});
