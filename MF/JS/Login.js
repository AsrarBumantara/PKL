// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdfOCmG8twkA0Ms-SzSo4T8wsNBdNMRlc",
  authDomain: "login-and-regis-9f0a2.firebaseapp.com",
  projectId: "login-and-regis-9f0a2",
  storageBucket: "login-and-regis-9f0a2.firebasestorage.app",
  messagingSenderId: "286984869633",
  appId: "1:286984869633:web:f5736da6b99d39aa0bed00",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

//submit
const submit = document.getElementById("submit");
submit.addEventListener("click", function (event) {
  event.preventDefault();
  //inputs
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      alert("login successfuly");
      window.location.href = "beranda.html";
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage);
      // ..
    });
});
