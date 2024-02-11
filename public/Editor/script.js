var currentTab = 0; // Current tab is set to be the first tab (0)
let events = [];
let achievements = [];
const eventsModal = document.querySelector(".events-modal");
const achievementsModal = document.querySelector(".achievements-modal");
const monthNames = [
  "January",
  "Febuary",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "Novemeber",
  "December",
];

showTab(currentTab); // Display the current tab

function showTab(n) {
  // This function will display the specified tab of the form...
  var x = document.getElementsByClassName("step");
  x[n].style.display = "block";
  //... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == x.length - 1) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  //... and run a function that will display the correct step indicator:
  fixStepIndicator(n);
}

function nextPrev(n) {
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("step");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form...
  if (currentTab >= x.length) {
    // ... the form gets submitted:
    document.getElementById("signUpForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x,
    y,
    i,
    valid = true;
  x = document.getElementsByClassName("step");
  y = x[currentTab].querySelectorAll("input, textarea");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "" && !y[i].classList.contains("optional")) {
      console.log(y[i]);
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("stepIndicator")[currentTab].className +=
      " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i,
    x = document.getElementsByClassName("stepIndicator");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class on the current step:
  x[n].className += " active";
}

function sanitize(string) {
  const map = {
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#x27;",
    "/": "&#x2F;",
  };
  const reg = /[&<>"'/]/gi;
  return string.replace(reg, (match) => map[match]);
}
function clearEventsModal() {
  document.querySelector(".events-modal .year").value = 2023;
  document.querySelector(".events-modal .month").value = 1;
  document.querySelector(".events-modal .desc").value = "";
}
function clearAchievementsModal() {
  document.querySelector(".achievements-modal textarea").value = "";
}
function updateTimeline() {
  document.querySelector(".timeline").innerHTML = "";
  for (var i = 0; i < events.length; i++) {
    let event = events[i];
    const eventElement = document.createElement("tr");
    eventElement.classList.add("event");
    eventElement.innerHTML = `<td class="event-date">${
      monthNames[event.month - 1]
    }-${event.year}</td>
    <td class="event-desc">${event.desc}</td>
    <td>
      <button class="removeEventButton" data-id="${i}">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </td>`;
    document.querySelector(".timeline").appendChild(eventElement);
  }
  document.querySelectorAll(".removeEventButton").forEach((button) => {
    button.onclick = (e) => {
      e.preventDefault();
      events.splice(button.getAttribute("data-id"), 1);
      updateTimeline();
    };
  });
}
function updateAchievements() {
  document.querySelector(".achievements").innerHTML = "";
  for (var i = 0; i < achievements.length; i++) {
    let achievement = achievements[i];
    const achievementsElement = document.createElement("tr");
    achievementsElement.classList.add("achievement");
    achievementsElement.innerHTML = `<td class="event-date">${achievement}</td>
    
    <td>
      <button class="removeAchievementButton" data-id="${i}">
        <i class="fa-solid fa-xmark"></i>
      </button>
    </td>`;
    document.querySelector(".achievements").appendChild(achievementsElement);
  }
  document.querySelectorAll(".removeAchievementButton").forEach((button) => {
    button.onclick = (e) => {
      e.preventDefault();
      achievements.splice(button.getAttribute("data-id"), 1);
      updateAchievements();
    };
  });
}
document.querySelector("#newEvent").onclick = (e) => {
  e.preventDefault();
  document.querySelector(".events-modal .year").max = new Date().getFullYear();
  eventsModal.style.display = "grid";
};
document.querySelector("#newAchievement").onclick = (e) => {
  e.preventDefault();
  achievementsModal.style.display = "grid";
};
document.querySelector(".events-modal .addEvent").onclick = (e) => {
  e.preventDefault();
  if (
    document.querySelector(".events-modal .year").value >
    new Date().getFullYear()
  ) {
    alert("Well you can't add an event in the future, can you?");
    return;
  } else if (
    document.querySelector(".events-modal .year").value ==
      new Date().getFullYear() &&
    document.querySelector(".events-modal .month").value >
      new Date().getMonth() + 1
  ) {
    alert("Still some months to reach that date, isn't it?");
    return;
  } else if (document.querySelector(".events-modal .desc").value == "") {
    alert("You did nothing at this date?");
    return;
  }
  events.push({
    year: document.querySelector(".events-modal .year").value,
    month: document.querySelector(".events-modal .month").value,
    desc: sanitize(document.querySelector(".events-modal .desc").value),
  });
  updateTimeline();
  clearEventsModal();
  eventsModal.style.display = "none";
};

document.querySelector(".achievements-modal .addAchievement").onclick = (e) => {
  if (
    document.querySelector(".achievements-modal textarea").value.trim() == ""
  ) {
    alert("Empty Achievements?");
    return;
  }
  achievements.push(
    sanitize(
      document.querySelector(".achievements-modal textarea").value.trim()
    )
  );
  updateAchievements();
  clearAchievementsModal();
  achievementsModal.style.display = "none";
};
document.querySelector(".events-modal .cancelModal").onclick = (e) => {
  e.preventDefault();
  clearEventsModal();
  eventsModal.style.display = "none";
};

document.querySelector(".achievements-modal .cancelModal").onclick = (e) => {
  e.preventDefault();
  clearAchievementsModal();
  achievementsModal.style.display = "none";
};
