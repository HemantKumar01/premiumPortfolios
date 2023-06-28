function animateOnScroll(translate = 100) {
  const fadeElements = document.querySelectorAll(".fade-on-scroll");

  let options = {
    rootMargin: "0px",
    threshold: 0.1,
  };
  let scrollAnimationObserverCallback = (entries, observer) => {
    entries.forEach((entry) => {
      // Each entry describes an intersection change for one observed
      // target element:
      //   entry.boundingClientRect
      //   entry.intersectionRatio
      //   entry.intersectionRect
      //   entry.isIntersecting
      //   entry.rootBounds
      //   entry.target
      //   entry.time
      if (
        entry.target.classList.contains("fade-on-scroll") &&
        !entry.target.classList.contains("fade-on-scroll-show")
      ) {
        entry.target.classList.toggle(
          "fade-on-scroll-show",
          entry.isIntersecting
        );
      }
    });
  };
  let scrollAnimationObserver = new IntersectionObserver(
    scrollAnimationObserverCallback,
    options
  );

  for (let element of fadeElements) {
    var direction = element.getAttribute("data-fromdirection");
    if (direction == "top") {
      element.style.transform = `translateY(${-translate}px)`;
    } else if (direction == "bottom") {
      element.style.transform = `translateY(${translate}px)`;
    } else if (direction == "left") {
      element.style.transform = `translateX(${-translate}px)`;
    } else if (direction == "right") {
      element.style.transform = `translateX(${translate}px)`;
    }
    scrollAnimationObserver.observe(element);
  }
}
