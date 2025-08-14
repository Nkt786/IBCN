document.addEventListener('DOMContentLoaded', function() {
    // Button Hover Effects for Contact Form
    const buttons = document.querySelectorAll('.contact-form button');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.backgroundColor = '#ff7e5f';  // Change to the desired color
        });
        button.addEventListener('mouseleave', function() {
            this.style.backgroundColor = '';  // Revert to original background color
        });
    });

    // Hamburger Menu Toggle
    function toggleMenu() {
        const navLinks = document.querySelector('.nav-links');
        if (navLinks) {
            navLinks.classList.toggle('active');
        }
    }

    // Ensure the toggleMenu function is available globally by assigning it to `window`
    window.toggleMenu = toggleMenu;
});
