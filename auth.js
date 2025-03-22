// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-app.js";
import { getAuth, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "https://www.gstatic.com/firebasejs/11.5.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyDMel1G4loc4diMPhbBD3ChBwCWKMOnVUE",
    authDomain: "store-b16aa.firebaseapp.com",
    projectId: "store-b16aa",
    storageBucket: "store-b16aa.appspot.com",
    messagingSenderId: "52789071499",
    appId: "1:52789071499:web:c977c6322759e29f9f4e8e",
    measurementId: "G-DDQ9NHRVBY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

let isLoginInProgress = false;  // Prevent multiple login attempts

document.addEventListener("DOMContentLoaded", () => {
    const googleBtn = document.querySelector(".google-btn");
    const githubBtn = document.querySelector(".github-btn");

    // Google Login
    googleBtn.addEventListener("click", () => {
        if (isLoginInProgress) return;  // Prevent multiple clicks
        isLoginInProgress = true;  // Start the login process

        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("Google Sign-In Success:", result.user);
                alert("Google Login Successful! ✅");
                window.location.href = "/frontend/index1.html"; // Redirect after login
            })
            .catch((error) => {
                console.error("Google Sign-In Error:", error);
                alert("Google Login Failed ❌");
            })
            .finally(() => {
                isLoginInProgress = false;  // Allow future login attempts
            });
    });

    // GitHub Login
    githubBtn.addEventListener("click", () => {
        if (isLoginInProgress) return;  // Prevent multiple clicks
        isLoginInProgress = true;  // Start the login process

        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider)
            .then((result) => {
                console.log("GitHub Sign-In Success:", result.user);
                alert("GitHub Login Successful! ✅");
                window.location.href = "/frontend/index1.html"; // Redirect after login
            })
            .catch((error) => {
                console.error("GitHub Sign-In Error:", error);
                alert("GitHub Login Failed ❌");
            })
            .finally(() => {
                isLoginInProgress = false;  // Allow future login attempts
            });
    });
});
