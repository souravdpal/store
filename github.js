// GitHub OAuth Configuration
const CLIENT_ID = "Ov23liIMDUZRFuXpMq2L";  // Replace with your actual GitHub Client ID
const REDIRECT_URI = "https://souravdpal.github.io/store/frontend/index1.html"; // Ensure this is set in GitHub OAuth App settings
const SCOPE = "user";  // Basic OAuth scope
const STATE = Math.random().toString(36).substring(7); // Generate a random state for security

document.addEventListener("DOMContentLoaded", () => {
    const githubBtn = document.querySelector(".github-btn");

    if (githubBtn) {
        githubBtn.addEventListener("click", () => {
            // Redirect user to GitHub OAuth
            const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${SCOPE}&state=${STATE}`;
            window.location.href = githubAuthURL;
        });
    }
});
