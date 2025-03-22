// GitHub OAuth Configuration
const CLIENT_ID = "Ov23liIMDUZRFuXpMq2L";  // Replace with your actual GitHub Client ID
const REDIRECT_URI = "https://souravdpal.github.io/store/frontend/index1.html"; // Ensure this matches GitHub OAuth settings
const SCOPE = "user";  // Basic authentication scope
const STATE = Math.random().toString(36).substring(7); // Random state for security

document.addEventListener("DOMContentLoaded", () => {
    const githubBtn = document.querySelector(".github-btn");

    if (githubBtn) {
        githubBtn.addEventListener("click", () => {
            const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPE}&state=${STATE}`;
            
            window.location.href = githubAuthURL; // Redirect user to GitHub OAuth page
        });
    }

    // Handle GitHub OAuth Callback
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
        console.log("GitHub Authorization Code:", code);
        // You need a backend to exchange this code for an access token
        // Redirect to frontend after successful authentication
        window.location.href = REDIRECT_URI;
    }
});
