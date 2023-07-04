/**
 * Function which resizes the elements and font-sizes to fit on screen
 * The element must not have any child
 */
async function resizeToFitContent(fromRecursion = false) {
  var elements = document.querySelectorAll(".fitOnScreen");
  for (let element of elements) {
    // element.style.width = "fit-content";
    if (!element.getAttribute("data-fontsize")) {
      element.setAttribute(
        "data-fontsize",
        getComputedStyle(element).fontSize.toString()
      );
    }

    if (
      parseFloat(getComputedStyle(element).width.slice(0, -2)) >
      document.body.clientWidth
    ) {
      var tmp = parseFloat(getComputedStyle(element).width.slice(0, -2));
      element.style.fontSize =
        parseFloat(getComputedStyle(element).fontSize.slice(0, -2)) -
        1.0 +
        "px";

      await resizeToFitContent(true);
      return Promise.resolve();
    } else {
      if (!fromRecursion) {
        element.style.fontSize = element.getAttribute("data-fontsize");
        await resizeToFitContent(true);
        return Promise.resolve();
      } else {
        return Promise.resolve();
      }
    }
  }
}
