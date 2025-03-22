// 🔥 GitHub OAuth - Frontend Only (No Backend Required)

// ✅ Replace this with your actual GitHub Client ID
const CLIENT_ID = "Ov23liRTmWBwk7ezelkO"; 

// ✅ Make sure this matches your GitHub OAuth app settings
const REDIRECT_URI = "https://souravdpal.github.io/store/index1.html";

// ✅ Debugging logs (Check these in browser console F12)
console.log("GitHub OAuth | Client ID:", CLIENT_ID);
console.log("GitHub OAuth | Redirect URI:", REDIRECT_URI);

document.addEventListener("DOMContentLoaded", () => {
    const githubBtn = document.querySelector(".github-btn");

    if (githubBtn) {
        githubBtn.addEventListener("click", () => {
            // 🔗 Construct the GitHub OAuth URL
            const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=user`;
            
            console.log("🔄 Redirecting to:", githubAuthURL);
            
            // 🌍 Redirect user to GitHub login
            window.location.href = githubAuthURL;
        });
    }
});
