// Menu Section JavaScript
document.addEventListener('DOMContentLoaded', () => {
    const dishCards = document.querySelectorAll('.dish-card');
    let cart = {};

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

    dishCards.forEach(card => observer.observe(card));

    // Quantity change functionality
    function changeQuantity(itemId, change, price) {
        const quantityElement = document.getElementById(`quantity-${itemId}`);
        let currentQuantity = parseInt(quantityElement.textContent);
        let newQuantity = currentQuantity + change;

        if (newQuantity < 0) {
            newQuantity = 0;
        }

        // Add animation class
        quantityElement.classList.add('pulse');
        setTimeout(() => {
            quantityElement.classList.remove('pulse');
        }, 300);

        quantityElement.textContent = newQuantity;

        if (newQuantity > 0) {
            const cardElement = quantityElement.closest('.dish-card');
            const nameElement = cardElement.querySelector('h3') || cardElement.querySelector('h4');
            const itemName = nameElement ? nameElement.textContent.trim() : 'Unknown Item';

            cart[itemId] = { name: itemName, quantity: newQuantity, price: price };
            
            // Add visual feedback
            cardElement.classList.add('highlight');
            setTimeout(() => {
                cardElement.classList.remove('highlight');
            }, 500);
        } else {
            delete cart[itemId];
        }

        // Update cart in localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Add to cart functionality
    function addToCart(itemId, price) {
        const quantityElement = document.getElementById(`quantity-${itemId}`);
        const quantity = parseInt(quantityElement.textContent);
        
        if (quantity > 0) {
            const cardElement = quantityElement.closest('.dish-card');
            const nameElement = cardElement.querySelector('h3') || cardElement.querySelector('h4');
            const itemName = nameElement ? nameElement.textContent.trim() : 'Unknown Item';

            cart[itemId] = { name: itemName, quantity: quantity, price: price };
            
            // Add success animation
            cardElement.classList.add('success-animation');
            setTimeout(() => {
                cardElement.classList.remove('success-animation');
            }, 1000);

            // Show notification
            showNotification(`${quantity} ${itemName}(s) added to cart!`);
            
            // Update cart in localStorage
            localStorage.setItem('cart', JSON.stringify(cart));
        } else {
            showNotification('Please select a quantity first!', 'error');
        }
    }

    // Notification function
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);

        // Add animation
        notification.classList.add('fade-in');
        
        setTimeout(() => {
            notification.classList.remove('fade-in');
            notification.classList.add('fade-out');
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    // Load cart from localStorage on page load
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
        cart = JSON.parse(savedCart);
        // Update quantity displays
        Object.entries(cart).forEach(([itemId, item]) => {
            const quantityElement = document.getElementById(`quantity-${itemId}`);
            if (quantityElement) {
                quantityElement.textContent = item.quantity;
            }
        });
    }

    // Make functions available globally
    window.changeQuantity = changeQuantity;
    window.addToCart = addToCart;
}); 