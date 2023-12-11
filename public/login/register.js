const reg_form = document.querySelector("form#register");
const email = reg_form.querySelector("input[type=email]");
const passwords = reg_form.querySelectorAll("input[type=password]");
const password_matching_status = reg_form.querySelector("#password-matching");

//checking both password and confirm password have same input
for (password_input of passwords) {
  password_input.oninput = () => {
    password_matching_status.className = "";
    if (passwords[1].value == passwords[0].value) {
      password_matching_status.innerHTML = `<i class='fa fa-check'></i>`;
    } else {
      password_matching_status.innerHTML = `Passwords do not match`;
      password_matching_status.className = "error";
    }
  };
}

document.addEventListener("email-verification-sent", (e) => {
  reg_form.querySelector(".success").style.display = "block";
  reg_form.querySelector(".loader").style.display = "none";
  reg_form.querySelector(".container").style.display = "none";
});

reg_form.onsubmit = async (e) => {
  e.preventDefault();
  if (passwords[1].value != passwords[0].value) {
    alert("Password and Confirmed Password do not match!");
    return;
  }

  reg_form.querySelector(".loader").style.display = "flex";

  firebase
    .registerUser(email.value, password.value)
    .then((user) => {
      reg_form.querySelector(".loader").style.display = "none";
      reg_form.querySelector(".container").style.display = "none";
      reg_form.querySelector(".successful").style.display = "flex";
    })
    .catch((errCodeNumber) => {
      reg_form.querySelector(".loader").style.display = "none";
    });
};
