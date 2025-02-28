/*

import React, { useState, useEffect } from 'react';

function FoodManager() {
  const [foods, setFoods] = useState([]);
  const [newFood, setNewFood] = useState({ name: '', weight: '', quantity: '', price: '' });
  const [editFoodId, setEditFoodId] = useState(null);
  const [editFoodData, setEditFoodData] = useState({ name: '', weight: '', quantity: '', price: '' });
  const [category, setCategory] = useState('RÝŽE A LUŠTĚNINY'); // Default category
  const [productsJson, setProductsJson] = useState(null);

  // Fetch existing food data based on the category
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/${category}`);
        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [category]); // This effect runs whenever the category changes

  // Fetch and display products.json file content
  useEffect(() => {
    const fetchProductsJson = async () => {
      try {
        const response = await fetch('http://localhost:3001/products.json'); // Assuming this is the path to the products.json
        const json = await response.json();
        setProductsJson(json);
      } catch (error) {
        console.error("Error fetching products.json:", error);
      }
    };

    fetchProductsJson();
  }, []);

  // Get the next ID based on the last ID in the list
  const getNextId = async () => {
    try {
      const response = await fetch(`http://localhost:3001/get-max-id/${category}`);
      const data = await response.json();
      return data.maxId + 1;
    } catch (error) {
      console.error("Error fetching max ID:", error);
      return 1; // If something goes wrong, default to ID 1
    }
  };

  // Add a new food product
  const addFood = async () => {
    if (!newFood.name || !newFood.weight || !newFood.quantity || !newFood.price) {
      alert('Please fill out all fields.');
      return;
    }

    const nextId = await getNextId();
    const newFoodWithId = {
      id: nextId,
      ...newFood,
      weight: parseFloat(newFood.weight),
      quantity: parseInt(newFood.quantity),
      price: parseFloat(newFood.price),
    };

    try {
      const response = await fetch(`http://localhost:3001/${category}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFoodWithId),
      });

      if (response.ok) {
        const addedFood = await response.json();
        console.log("Food added successfully:", addedFood);
        setFoods((prevFoods) => [...prevFoods, addedFood]);
        setNewFood({ name: '', weight: '', quantity: '', price: '' }); // Clear input fields
      } else {
        console.error("Failed to add food. Status:", response.status);
      }
    } catch (error) {
      console.error("Error adding food:", error);
    }
  };

  // Delete a food product
  const deleteFood = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/${category}/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setFoods((prevFoods) => prevFoods.filter((food) => food.id !== id));
      }
    } catch (error) {
      console.error("Error deleting food:", error);
    }
  };

  // Update a food product
  const updateFood = async (id, updatedFood) => {
    try {
      const response = await fetch(`http://localhost:3001/${category}/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedFood),
      });

      if (response.ok) {
        const updated = await response.json();
        setFoods((prevFoods) =>
          prevFoods.map((food) => (food.id === id ? updated : food))
        );
        setEditFoodId(null);
        setEditFoodData({ name: '', weight: '', quantity: '', price: '' });
      }
    } catch (error) {
      console.error("Error updating food:", error);
    }
  };

  // Handle the edit mode toggling
  const handleEditClick = (food) => {
    setEditFoodId(food.id);
    setEditFoodData({
      name: food.name,
      weight: food.weight,
      quantity: food.quantity,
      price: food.price,
    });
  };

  // Submit the edit form
  const handleEditSubmit = () => {
    if (editFoodId) {
      updateFood(editFoodId, {
        id: editFoodId,
        ...editFoodData,
        weight: parseFloat(editFoodData.weight),
        quantity: parseInt(editFoodData.quantity),
        price: parseFloat(editFoodData.price),
      });
    }
  };

  // Change category
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  return (
    <div>
      <h1>Food Manager</h1>

      
      <div>
        <h3>Select Category:</h3>
        <select value={category} onChange={handleCategoryChange}>
          <option value="RÝŽE A LUŠTĚNINY">RÝŽE A LUŠTĚNINY</option>
          <option value="POTRAVINY">POTRAVINY</option>
          <option value="NÁPOJE">NÁPOJE</option>
          
        </select>
      </div>

   
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
            <button onClick={() => handleEditClick(food)}>Edit</button>
          </li>
        ))}
      </ul>

      {editFoodId && (
        <div>
          <h2>Edit Food</h2>
          <input
            type="text"
            placeholder="Food Name"
            value={editFoodData.name}
            onChange={(e) => setEditFoodData({ ...editFoodData, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Weight (g)"
            value={editFoodData.weight}
            onChange={(e) => setEditFoodData({ ...editFoodData, weight: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={editFoodData.quantity}
            onChange={(e) => setEditFoodData({ ...editFoodData, quantity: e.target.value })}
          />
          <input
            type="text"
            placeholder="Price ($)"
            value={editFoodData.price}
            onChange={(e) => setEditFoodData({ ...editFoodData, price: e.target.value })}
          />
          <button onClick={handleEditSubmit}>Update Food</button>
        </div>
      )}

      
      <div>
        <h3>Products.json Content</h3>
        <pre>{JSON.stringify(productsJson, null, 2)}</pre>
      </div>
    </div>
  );
}

export default FoodManager;
*/