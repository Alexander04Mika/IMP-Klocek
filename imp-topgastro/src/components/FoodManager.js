import React, { useState, useEffect } from 'react';

function FoodManager() {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({ name: '', weight: '', quantity: '', price: '' });

  // Fetch existing food data on load
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('http://localhost:3002/products'); // Updated to use the correct endpoint
      const data = await response.json();
      setFoods(data);
    };

    fetchData();
  }, []);

  // Get the next ID based on the last ID in the list
  const getNextId = () => {
    if (foods.length === 0) return 1;
    const maxId = Math.max(...foods.map((food) => food.id));
    return maxId + 1;
  };

  // Add a new food product
  const addFood = async () => {
    if (!newFood.name || !newFood.weight || !newFood.quantity || !newFood.price) {
      alert('Please fill out all fields.');
      return;
    }

    const newFoodWithId = {
      id: getNextId(),
      ...newFood,
      weight: parseFloat(newFood.weight),
      quantity: parseInt(newFood.quantity),
      price: parseFloat(newFood.price),
    };

    const response = await fetch('http://localhost:3002/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newFoodWithId),
    });

    if (response.ok) {
      const addedFood = await response.json();
      setFoods([...foods, addedFood]);
      setNewFood({ name: '', weight: '', quantity: '', price: '' }); // Clear input fields
    }
  };

  // Delete a food product
  const deleteFood = async (id) => {
    const response = await fetch(`http://localhost:3002/products/${id}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      setFoods(foods.filter((food) => food.id !== id));
    }
  };

  // Update a food product
  const updateFood = async (id, updatedFood) => {
    const response = await fetch(`http://localhost:3002/products/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedFood),
    });

    if (response.ok) {
      const updated = await response.json();
      setFoods(foods.map((food) => (food.id === id ? updated : food)));
    }
  };

  return (
    <div>
      <h1>Food Manager</h1>
      <div>
        <h2>Add New Food</h2>
        <input
          type="text"
          placeholder="Food Name"
          value={newFood.name}
          onChange={(e) => setNewFood({ ...newFood, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Weight (g)"
          value={newFood.weight}
          onChange={(e) => setNewFood({ ...newFood, weight: e.target.value })}
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newFood.quantity}
          onChange={(e) => setNewFood({ ...newFood, quantity: e.target.value })}
        />
        <input
          type="text"
          placeholder="Price ($)"
          value={newFood.price}
          onChange={(e) => setNewFood({ ...newFood, price: e.target.value })}
        />
        <button onClick={addFood}>Add Food</button>
      </div>

      <h2>Current Food List</h2>
      <ul>
        {foods.map((food) => (
          <li key={food.id}>
            <strong>{food.name}</strong> - Weight: {food.weight}g, Quantity: {food.quantity}, Price: ${food.price.toFixed(2)}
            <button onClick={() => deleteFood(food.id)}>Delete</button>
            <button
              onClick={() =>
                updateFood(food.id, {
                  ...food,
                  name: 'Updated ' + food.name,
                  weight: food.weight + 10,
                  price: food.price + 1,
                })
              }
            >
              Update
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FoodManager;
