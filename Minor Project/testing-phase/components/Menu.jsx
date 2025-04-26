import React from 'react';

const Menu = () => {
  const menuItems = [
    {
      id: 1,
      name: 'Margherita Pizza',
      description: 'Classic tomato sauce, mozzarella, and basil',
      price: '$12.99',
      image: '/images/pizza.jpg'
    },
    {
      id: 2,
      name: 'Chicken Burger',
      description: 'Grilled chicken patty with lettuce and special sauce',
      price: '$9.99',
      image: '/images/burger.jpg'
    },
    {
      id: 3,
      name: 'Caesar Salad',
      description: 'Fresh romaine lettuce, croutons, and parmesan',
      price: '$8.99',
      image: '/images/salad.jpg'
    }
  ];

  return (
    <section className="menu">
      <h2>Our Menu</h2>
      <div className="menu-items">
        {menuItems.map(item => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} />
            <h3>{item.name}</h3>
            <p>{item.description}</p>
            <span className="price">{item.price}</span>
            <button className="add-to-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Menu; 