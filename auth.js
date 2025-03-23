// Import necessary Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3_Otys41HjaAnDG8f2jFuzzuUJTiF-Po",
    authDomain: "store-work-10c7d.firebaseapp.com",
    projectId: "store-work-10c7d",
    storageBucket: "store-work-10c7d.appspot.com", // Fixed storage bucket URL
    messagingSenderId: "364380068504",
    appId: "1:364380068504:web:fe303c05a95bb777b6ceed",
    measurementId: "G-DSG9XHW38R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// Google Auth Function
document.querySelector(".google-btn").addEventListener("click", () => {
    signInWithPopup(auth, provider)
        .then((result) => {
            console.log("User signed in:", result.user);
            alert(`Welcome, ${result.user.displayName}`);
            window.location.href = "home.html";  // Redirect to home page after login
        })
        .catch((error) => {
            console.error("Error during Google sign-in:", error);
        });
});

