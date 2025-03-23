// Announcement functionality
document.addEventListener("DOMContentLoaded", async function () {
    let allAnnouncements = [];
    const announcementBanner = document.getElementById("announcementBanner");
    const announcementContent = document.getElementById("announcementContent");
    const announcementClose = document.getElementById("announcementClose");

    // Debug: Check if DOM elements are found
    console.log("DOM Elements:", {
        announcementBanner,
        announcementContent,
        announcementClose
    });

    // Check if the announcement has been dismissed
    const isDismissed = localStorage.getItem("announcementDismissed");
    console.log("Is Announcement Dismissed:", isDismissed);

    if (!isDismissed) {
        try {
            // Fetch announcements from the provided URL
            const response = await fetch("https://raw.githubusercontent.com/souravdpal/data.json/master/announcements.json");
            if (!response.ok) throw new Error("Failed to fetch announcements");
            const data = await response.json();
            console.log("Fetched Announcements:", data);

            // Ensure the data is an array
            allAnnouncements = Array.isArray(data) ? data : [];
            console.log("All Announcements:", allAnnouncements);

            // If there are announcements, proceed with display
            if (allAnnouncements.length > 0) {
                let currentIndex = 0;

                // Random Announcement on Initial Load
                const randomIndex = Math.floor(Math.random() * allAnnouncements.length);
                currentIndex = randomIndex; // Start with a random announcement
                console.log("Random Initial Index:", currentIndex);

                // Function to display the current announcement
                const displayAnnouncement = () => {
                    const announcement = allAnnouncements[currentIndex];
                    console.log("Displaying Announcement:", announcement);
                    announcementContent.innerHTML = `
                        <i class="${announcement.icon}"></i>
                        <span>${announcement.message}</span>
                        ${announcement.link ? `<a href="${announcement.link}" class="announcement-link">Shop Now</a>` : ""}
                    `;
                    announcementBanner.style.display = "block";
                };

                // Display the initial random announcement
                displayAnnouncement();

                // Cycle Through Announcements Every 5 Seconds
                setInterval(() => {
                    currentIndex = (currentIndex + 1) % allAnnouncements.length;
                    displayAnnouncement();
                }, 5000);
            } else {
                console.log("No announcements to display.");
            }
        } catch (error) {
            console.error("Error fetching announcements:", error);
        }

        // Close button functionality
        announcementClose.addEventListener("click", () => {
            console.log("Closing announcement banner.");
            announcementBanner.style.display = "none";
            localStorage.setItem("announcementDismissed", "true");
        });
    } else {
        console.log("Announcement dismissed, not showing banner.");
    }
});
