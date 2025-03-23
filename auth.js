// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA3_Otys41HjaAnDG8f2jFuzzuUJTiF-Po",
    authDomain: "store-work-10c7d.firebaseapp.com",
    projectId: "store-work-10c7d",
    storageBucket: "store-work-10c7d.appspot.com",
    messagingSenderId: "364380068504",
    appId: "1:364380068504:web:fe303c05a95bb777b6ceed",
    measurementId: "G-DSG9XHW38R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Google Authentication
const googleProvider = new GoogleAuthProvider();
document.querySelector(".google-btn").addEventListener("click", () => {
    const googleBtn = document.querySelector(".google-btn");
    const loadingSpinner = googleBtn.querySelector(".loading-spinner");

    // Show loading state
    googleBtn.disabled = true;
    googleBtn.style.opacity = "0.7";
    loadingSpinner.style.display = "flex";

    signInWithPopup(auth, googleProvider)
        .then((result) => {
            console.log("Google User:", result.user);
            alert(`Welcome, ${result.user.displayName}! You have successfully logged in with Google.`);
            window.location.href = "https://souravdpal.github.io/store/home.html"; // Redirect to home
        })
        .catch((error) => {
            console.error("Google Sign-in Error:", error);
            alert("❌ Google Login Failed! Please try again.");
        })
        .finally(() => {
            // Reset loading state
            googleBtn.disabled = false;
            googleBtn.style.opacity = "1";
            loadingSpinner.style.display = "none";
        });
});
