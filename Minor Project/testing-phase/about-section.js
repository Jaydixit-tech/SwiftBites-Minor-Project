// About Section JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const aboutSection = document.querySelector('.about');
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');

    // Add intersection observer for scroll animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, {
        threshold: 0.1
    });

    if (aboutSection) observer.observe(aboutSection);
    if (aboutImage) observer.observe(aboutImage);
    if (aboutText) observer.observe(aboutText);

    // Add hover effect for the black button
    const blackBtn = document.querySelector('.black-btn');
    if (blackBtn) {
        blackBtn.addEventListener('mouseenter', () => {
            blackBtn.style.transform = 'scale(1.05)';
            blackBtn.style.transition = 'transform 0.3s ease';
        });

        blackBtn.addEventListener('mouseleave', () => {
            blackBtn.style.transform = 'scale(1)';
        });

        // Add click handler for the black button
        blackBtn.addEventListener('click', () => {
            window.location.href = 'Menupage.html';
        });
    }
}); 