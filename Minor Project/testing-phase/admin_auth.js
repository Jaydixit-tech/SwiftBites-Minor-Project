const API_BASE_URL = 'http://localhost:5000/api';

// Admin Authentication
const adminAuth = {
  // Check if admin is logged in
  isAdminLoggedIn() {
    return localStorage.getItem('adminLoggedIn') === 'true';
  },

  // Set admin login status
  setAdminLoggedIn(status) {
    localStorage.setItem('adminLoggedIn', status);
  },

  // Handle admin login
  handleAdminLogin(event) {
    event.preventDefault();
    
    const username = document.getElementById('adminUsername').value;
    const password = document.getElementById('adminPassword').value;
    const usernameError = document.getElementById('usernameError');
    const passwordError = document.getElementById('passwordError');
    
    // Reset error messages
    usernameError.style.display = 'none';
    passwordError.style.display = 'none';
    
    // Check for default admin credentials
    if (username === 'admin123' && password === '123') {
      // Successful login
      this.setAdminLoggedIn(true);
      window.location.href = 'admin_dashboard.html';
    } else {
      // Failed login
      usernameError.textContent = 'Invalid username or password';
      usernameError.style.display = 'block';
      passwordError.style.display = 'block';
    }
  },

  // Handle admin logout
  handleAdminLogout() {
    this.setAdminLoggedIn(false);
    window.location.href = 'test1.html';
  },

  // Check admin session on page load
  checkAdminSession() {
    if (this.isAdminLoggedIn()) {
      // Redirect to admin dashboard if already logged in
      if (window.location.pathname !== '/admin_dashboard.html') {
        window.location.href = 'admin_dashboard.html';
      }
    } else {
      // Redirect to login page if not logged in
      if (window.location.pathname === '/admin_dashboard.html') {
        window.location.href = 'test1.html';
      }
    }
  }
};

// Initialize admin session check
document.addEventListener('DOMContentLoaded', () => {
  adminAuth.checkAdminSession();
});

// Food Items API
const foodItemsAPI = {
  async getAllFoodItems(category) {
    try {
      const url = category 
        ? `${API_BASE_URL}/food-items?category=${category}`
        : `${API_BASE_URL}/food-items`;
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch food items');
      return await response.json();
    } catch (error) {
      console.error('Error fetching food items:', error);
      throw error;
    }
  },

  async addFoodItem(foodItem) {
    try {
      const response = await fetch(`${API_BASE_URL}/food-items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminAuth.getToken()}`
        },
        body: JSON.stringify(foodItem)
      });

      if (!response.ok) throw new Error('Failed to add food item');
      return await response.json();
    } catch (error) {
      console.error('Error adding food item:', error);
      throw error;
    }
  },

  async updateFoodItem(id, foodItem) {
    try {
      const response = await fetch(`${API_BASE_URL}/food-items/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${adminAuth.getToken()}`
        },
        body: JSON.stringify(foodItem)
      });

      if (!response.ok) throw new Error('Failed to update food item');
      return await response.json();
    } catch (error) {
      console.error('Error updating food item:', error);
      throw error;
    }
  },

  async deleteFoodItem(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/food-items/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${adminAuth.getToken()}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete food item');
      return true;
    } catch (error) {
      console.error('Error deleting food item:', error);
      throw error;
    }
  }
};

// Export the API objects
window.adminAuth = adminAuth;
window.foodItemsAPI = foodItemsAPI; 