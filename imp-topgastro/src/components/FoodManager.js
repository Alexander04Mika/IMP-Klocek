import React, { useState, useEffect } from 'react';


function FoodManager() {
    const [foods, setFoods] = useState([]);
  
    // Fetch existing food data on load
    useEffect(() => {
      const fetchData = async () => {
        const response = await fetch('http://localhost:3001/foods');
        const data = await response.json();
        setFoods(data);
      };
  
      fetchData();
    }, []);
  
    const addFood = async (newFood) => {
      const response = await fetch('http://localhost:3001/foods', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFood),
      });
  
      if (response.ok) {
        setFoods([...foods, newFood]);
      }
    };
  
    const deleteFood = async (id) => {
      const response = await fetch(`http://localhost:3001/foods/${id}`, {
        method: 'DELETE',
      });
  
      if (response.ok) {
        setFoods(foods.filter((food) => food.id !== id));
      }
    };
  
    return (
      <div>
        <h1>Food Manager</h1>
        <ul>
          {foods.map((food) => (
            <li key={food.id}>
              {food.name} - {food.calories} calories
              <button onClick={() => deleteFood(food.id)}>Delete</button>
            </li>
          ))}
        </ul>
        <button
          onClick={() =>
            addFood({ id: Date.now(), name: 'Sushi', calories: 200 })
          }
        >
          Add Sushi
        </button>
      </div>
    );
  }
export default FoodManager;