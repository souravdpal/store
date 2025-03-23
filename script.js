// Announcement functionality
document.addEventListener("DOMContentLoaded", async () => {
    const announcementBanner = document.getElementById("announcementBanner");
    const announcementContent = document.getElementById("announcementContent");
    const announcementClose = document.getElementById("announcementClose");

    // Check if the announcement has been dismissed
    const isDismissed = localStorage.getItem("announcementDismissed");

    if (!isDismissed) {
        try {
            // Fetch announcements from the provided URL
            const response = await fetch("https://raw.githubusercontent.com/souravdpal/data.json/master/announcements.json");
            const announcements = await response.json();

            // If there are announcements, display the first one
            if (announcements.length > 0) {
                const announcement = announcements[0]; // Display the first announcement
                announcementContent.innerHTML = `
                    <i class="${announcement.icon}"></i>
                    <span>${announcement.message}</span>
                    ${announcement.link ? `<a href="${announcement.link}" class="announcement-link">Shop Now</a>` : ""}
                `;
                announcementBanner.style.display = "block";
            }
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }

        // Close button functionality
        announcementClose.addEventListener("click", () => {
            announcementBanner.style.display = "none";
            localStorage.setItem("announcementDismissed", "true");
        });
    }
});
