// Deciding Text color on main title if it should be black or white depending on background color

// https://stackoverflow.com/questions/3942878/how-to-decide-font-color-in-white-or-black-depending-on-background-color
// TODO: Return Dark/Light shades of background color instead of white or black
function getColor(backgroundRGB) {
  backgroundRGB = backgroundRGB.map((rgb) => parseInt(rgb.toString().trim()));
  console.log(backgroundRGB);
  if (
    backgroundRGB[0] * 0.299 +
      backgroundRGB[1] * 0.587 +
      backgroundRGB[2] * 0.114 >
    186
  ) {
    return "#000000ca";
  } else {
    return "#ffffff";
  }
}

function getHeroBackgroundRGB() {
  const background = window
    .getComputedStyle(document.querySelector(".hero"), null)
    .getPropertyValue("background");
  //output is of the below form:
  // rgba(0, 0, 0, 0) linear-gradient(90deg, rgb(179, 110, 247) 50%, rgb(123, 97, 255) 50%, rgb(123, 97, 255) 100%) repeat scroll 0% 0% / auto padding-box border-box
  backgroundRGBList = background.slice(40, 87).split("50%, ");
  backgroundRGBList.pop();
  backgroundRGBList = backgroundRGBList.map((rgb) =>
    rgb.slice(4, rgb.length - 2).split(", ")
  );
  return backgroundRGBList;
}

console.log(getColor(getHeroBackgroundRGB()[0]));
console.log(getColor(getHeroBackgroundRGB()[1]));

document.documentElement.style.setProperty(
  "--font-clr",
  getColor(getHeroBackgroundRGB()[1])
);
