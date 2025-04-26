// Footer Section JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Quick links functionality
    const quickLinks = document.querySelectorAll('.footer-col ul li a');
    
    quickLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add current year to footer
    const currentYear = new Date().getFullYear();
    const footerBottom = document.querySelector('.footer-bottom');
    if (footerBottom) {
        footerBottom.innerHTML += `<p>© ${currentYear} SWIFTBITES. All rights reserved.</p>`;
    }
}); 