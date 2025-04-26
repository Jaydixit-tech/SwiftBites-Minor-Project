// Hero Section JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const heroSection = document.querySelector('.hero');
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');
    const orangeBtn = document.querySelector('.orange-btn');

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

    if (heroSection) observer.observe(heroSection);
    if (heroText) observer.observe(heroText);
    if (heroImage) observer.observe(heroImage);

    // Add hover effect for the orange button
    if (orangeBtn) {
        orangeBtn.addEventListener('mouseenter', () => {
            orangeBtn.style.transform = 'scale(1.05)';
            orangeBtn.style.transition = 'transform 0.3s ease';
        });

        orangeBtn.addEventListener('mouseleave', () => {
            orangeBtn.style.transform = 'scale(1)';
        });

        // Add click handler for the orange button
        orangeBtn.addEventListener('click', () => {
            window.location.href = 'Menupage.html';
        });
    }

    // Add parallax effect to hero image
    window.addEventListener('scroll', () => {
        if (heroImage) {
            const scrolled = window.pageYOffset;
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}); 