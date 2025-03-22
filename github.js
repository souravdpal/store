// Define OAuth constants here for easier updates
const CLIENT_ID = "Ov23liIMDUZRFuXpMq2L";  // Replace with your GitHub Client ID
const CLIENT_SECRET = "ca620d0678f21aa33fd4919c341a685a4b24fe99";  // Replace with your GitHub Client Secret (Don't expose this in frontend, it's for backend only)
const REDIRECT_URI = "https://souravdpal.github.io/store/github-callback";  // Your redirect URI, e.g., callback URL
const SCOPE = "user repo";  // Define the permissions you need (e.g., user data, repositories)
const STATE = "randomState";  // A random state string for security (optional but recommended)

document.addEventListener("DOMContentLoaded", () => {
    const githubBtn = document.querySelector(".github-btn");

    // GitHub Login
    githubBtn.addEventListener("click", () => {
        // Construct the GitHub OAuth URL for login
        const githubAuthURL = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPE}&state=${STATE}`;

        // Redirect to GitHub for authentication
        window.location.href = githubAuthURL;
    });

    // Handle the callback from GitHub (this should be on the redirect URI page like github-callback.html)
    if (window.location.href.includes("github-callback")) {
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');  // Extract the 'code' query parameter
        const state = urlParams.get('state');  // Extract the 'state' parameter (for security)

        if (state === STATE) {
            // Now exchange the code for an access token via GitHub API (this should ideally be done server-side)
            fetch(`https://github.com/login/oauth/access_token?client_id=${CLIENT_ID}&client_secret=${CLIENT_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`, {
                method: "POST",
                headers: {
                    "Accept": "application/json"
                }
            })
            .then(response => response.json())
            .then(data => {
                const accessToken = data.access_token;
                console.log("GitHub Access Token:", accessToken);

                // After successful authentication, redirect to your main page
                window.location.href = "/frontend/index1.html";  // Redirect to your main page after successful login
            })
            .catch(error => {
                console.error("GitHub OAuth Error:", error);
                alert("GitHub Login Failed ❌");
            });
        } else {
            alert("State mismatch or error in the OAuth flow");
        }
    }
});
