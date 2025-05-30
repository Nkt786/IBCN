// Initialize EmailJS with your Public Key
emailjs.init("FBGiYAg29txLLWyok");  // Replace with your EmailJS Public Key

// Event listener for form submission
document.getElementById("contact-form").addEventListener("submit", function(event) {
    event.preventDefault();  // Prevent default form submission

    // Collect form data
    var formData = {
        full_name: document.getElementById("full-name").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        institution: document.getElementById("institution").value
    };

    // Send email via EmailJS
    emailjs.send("service_1c9fs15", "template_nwi8xoc", formData)  // Replace "template_nwi8xoc" with your actual template ID
    .then(function(response) {
        // Show success message
        alert("Message sent successfully!");
    }, function(error) {
        // Show error message
        alert("Failed to send message. Error: " + error.text);
    });
});
