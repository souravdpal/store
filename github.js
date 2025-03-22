const CLIENT_ID = "Ov23liIMDUZRFuXpMq2L";  // Replace with your actual Client ID
const REDIRECT_URI = "https://souravdpal.github.io/store/github-callback";
const SCOPE = "user repo";
const STATE = "randomState";  

document.addEventListener("DOMContentLoaded", () => {
    const githubBtn = document.querySelector(".github-btn");

    if (githubBtn) {
        githubBtn.addEventListener("click", () => {
            const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${STATE}`;
            window.location.href = githubAuthURL;
        });
    }

    if (window.location.href.includes("github-callback")) {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const state = urlParams.get('state');

        if (state === STATE) {
            getAccessToken(code);
        } else {
            alert("OAuth Error: State mismatch");
        }
    }
});

async function getAccessToken(code) {
    const CLIENT_ID = "Ov23liIMDUZRFuXpMq2L";
    const CLIENT_SECRET = "ca620d0678f21aa33fd4919c341a685a4b24fe99"; // ⚠️ DO NOT USE THIS IN FRONTEND!

    try {
        const response = await fetch(`https://github.com/login/oauth/access_token`, {
            method: "POST",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                client_id: CLIENT_ID,
                client_secret: CLIENT_SECRET,
                code: code
            })
        });

        const data = await response.json();
        if (data.access_token) {
            console.log("GitHub Access Token:", data.access_token);
            localStorage.setItem("github_token", data.access_token);
            window.location.href = "/frontend/index1.html";
        } else {
            alert("GitHub Login Failed ❌");
        }
    } catch (error) {
        console.error("OAuth Error:", error);
        alert("OAuth failed");
    }
}
