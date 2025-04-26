// Header navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all navigation links
    const navLinks = document.querySelectorAll('nav a');
    
    // Add click handlers for each navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('href');
            
            // Add click animation
            link.style.transform = 'scale(0.95)';
            setTimeout(() => {
                link.style.transform = 'scale(1)';
            }, 200);

            // Check if the target page exists
            if (targetPage) {
                // Add smooth transition effect
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = targetPage;
                }, 300);
            }
        });
    });

    // Add hover effects for navigation links
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            // Color change on hover
            link.style.color = '#f7931e';
            link.style.transition = 'color 0.3s ease';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.color = 'white';
        });
    });

    // Add active state for current page
    const currentPage = window.location.pathname.split('/').pop();
    navLinks.forEach(link => {
        const linkPage = link.getAttribute('href');
        if (linkPage === currentPage) {
            // Color change for active link
            link.style.color = '#f7931e';
        }
    });

    // Add keyframe animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(-20px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        nav a {
            animation: slideIn 0.5s ease forwards;
            opacity: 0;
        }

        nav a:nth-child(1) { animation-delay: 0.1s; }
        nav a:nth-child(2) { animation-delay: 0.2s; }
        nav a:nth-child(3) { animation-delay: 0.3s; }
        nav a:nth-child(4) { animation-delay: 0.4s; }
    `;
    document.head.appendChild(style);

    // Navigation active state
    const currentPath = window.location.pathname;
    
    navLinks.forEach(link => {
        if (link.getAttribute('href') === currentPath) {
            link.classList.add('active');
        }
    });

    // Add smooth scroll to navigation links
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}); 