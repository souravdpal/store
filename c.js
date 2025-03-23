document.addEventListener("DOMContentLoaded", function () {
    emailjs.init("TiYAPszuN4-3iMW5j"); // Replace with your actual EmailJS Public Key

    const form = document.querySelector(".contact-form");
    const submitBtn = document.querySelector(".contact-btn");
    const loadingSpinner = document.querySelector(".loading-spinner");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        let fullName = document.getElementById("fullName").value.trim();
        let emailAddress = document.getElementById("emailAddress").value.trim();
        let userMessage = document.getElementById("userMessage").value.trim();

        if (!fullName || !emailAddress || !userMessage) {
            alert("⚠ Please fill in all fields!");
            return;
        }

        // Show loading state
        submitBtn.disabled = true;
        submitBtn.style.opacity = "0.7";
        loadingSpinner.style.display = "flex";

        let templateParams = {
            fullName: fullName,
            emailAddress: emailAddress,
            userMessage: userMessage
        };

        emailjs.send("service_lhhkt2k", "template_pf421a3", templateParams)
            .then(function (response) {
                alert("✅ Your message has been sent successfully! We'll get back to you soon.");
                form.reset();
            })
            .catch(function (error) {
                alert("❌ Failed to send message. Please try again later.");
                console.error("EmailJS Error:", error);
            })
            .finally(function () {
                // Reset loading state
                submitBtn.disabled = false;
                submitBtn.style.opacity = "1";
                loadingSpinner.style.display = "none";
            });
    });
});
