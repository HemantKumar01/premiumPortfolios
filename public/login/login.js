const login_form = document.querySelector("form#login");
const email = login_form.querySelector("input[type=email]");
const passwords = login_form.querySelectorAll("input[type=password]");
const forgot_password = login_form.querySelector("#forgot-password");
let isPasswordResetForm = false;

login_form.onsubmit = (e) => {
  e.preventDefault();
  if (isPasswordResetForm) {
    firebase
      .resetPassword(login_form.querySelector("#email-forgot-password").value)
      .then(() => {
        alert("Link to reset password sent to your email");
        window.location.reload();
      })
      .catch((err) => {
        //error message is already alerted to user (see firebaseconfig.js)
        //so just reload the page to open login screen
        window.location.reload();
      });
    return;
  }

  login_form.querySelector(".loader").style.display = "flex";
  firebase
    .signInUser(email.value, password.value)
    .then((user) => {
      if (!user.emailVerified) {
        firebase.sendVerificationEmail().then(() => {
          login_form.querySelector(".loader").style.display = "none";
          login_form.querySelector(".container").style.display = "none";
          login_form.querySelector(".verification").style.display = "flex";
        });
      } else {
        document.body.style.background = "white";
        window.location.href = "/";
      }
    })
    .catch((errorCodeNumber) => {
      login_form.querySelector(".loader").style.display = "none";
    });
};

login_form.querySelector("#forgot-password-link").onclick = (e) => {
  e.preventDefault();
  login_form.innerHTML = `
  <h1>Reset Password</h1>
  <div class="input-container">
    <label for="email-forgot-password">Email</label>
    <input
      type="email"
      name="email-forgot-password"
      id="email-forgot-password"
      required
    />
  </div>
  <input type="submit" value="Send Reset Link" />
  <hr class="or" />
  <a href="/login" class="login-flow">Login</a>
  `;
  isPasswordResetForm = true;
};
