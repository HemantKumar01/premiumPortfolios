// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBs_OgQxibXXMXqmb1MzWfVI_OARvgThok",
  authDomain: "testing-ff0e3.firebaseapp.com",
  databaseURL:
    "https://testing-ff0e3-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "testing-ff0e3",
  storageBucket: "testing-ff0e3.appspot.com",
  messagingSenderId: "619833076225",
  appId: "1:619833076225:web:a9db974e3fa32d68046e00",
  measurementId: "G-YDML811LSH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const auth = getAuth();

export function isSignedIn() {
  return new Promise((resolve, reject) => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User is signed in");
        resolve(user);
      } else {
        console.log("User is not signed in");
        resolve(null);
      }
    });
  });
}

export function registerUser(email, password) {
  return new Promise((resolve, reject) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        resolve(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("Error while registering User: ", error);
        console.log("error.code: ", errorCode);
        console.log("error.message: ", errorMessage);

        if (errorCode == "auth/weak-password") {
          alert("weak password. Password must be atleast 6 letters long");

          reject(0);
          return;
        }
        if (errorCode == "auth/email-already-in-use") {
          alert("Email is already registered. Please login to continue.");

          reject(1);
          return;
        }
        if (errorCode == "auth/invalid-email") {
          alert("Invalid Email");
          reject(2);
          return;
        }

        alert(errorCode);
        reject(-1);
      });
  });
}

export function signInUser(email, password) {
  return new Promise((resolve, reject) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);

        resolve(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("sign in error: ", error);

        if (errorCode == "auth/user-not-found") {
          alert("User Not Found. Please Register before Logging In.");
          reject(10);
          return;
        }
        if (errorCode == "auth/invalid-email") {
          alert("Invalid Email");
          reject(2);
          return;
        }
        alert(errorCode);
        reject(-1);
      });
  });
}

export function sendVerificationEmail() {
  return new Promise((resolve, reject) => {
    sendEmailVerification(auth.currentUser)
      .then(() => {
        // Email verification sent!
        // ...
        console.log("Email Verification sent");
        resolve();
      })
      .catch((err) => {
        console.log(err);
        alert(err.code);
        reject(-1);
      });
  });
}

export function resetPassword(email) {
  return new Promise((resolve, reject) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log("Password Reset Email Sent");
        resolve();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        if (errorCode == "auth/missing-email") {
          alert("Email Id not registered. Please register before logging in.");
          reject(10);
          return;
        }
        alert(errorCode);
        reject(-1);
        // ..
      });
  });
}

export function signOutUser() {
  return new Promise((resolve, reject) => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        console.log("Sign Out Successful");
        resolve();
      })
      .catch((error) => {
        // An error happened.
        console.log("Sign Out Error: ", error);
        alert(error.code);
        reject();
      });
  });
}
