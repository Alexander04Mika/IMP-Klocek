import React, { useState, useEffect } from 'react';

function UpdateProducts() {
  const [products, setProducts] = useState([]); // Fetched products
  const [categories, setCategories] = useState([]); // Fetched categories
  const [selectedId, setSelectedId] = useState(''); // Selected product
  const [content, setContent] = useState(''); // Product content update
  const [newProduct, setNewProduct] = useState({ name: '', weight: '', price: '', quantity: '', category_id: '' });

  // ✅ Fetch products and categories on component mount
  useEffect(() => {
    fetch('https://topgastro.store/api/get-products.php')
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));

    fetch('https://topgastro.store/api/get-categories.php')
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // ✅ Handle product update
  const handleUpdate = async () => {
    if (!selectedId || !content) {
      alert('Please select a product and enter new content.');
      return;
    }

    try {
      const response = await fetch('https://topgastro.store/api/update-content.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: selectedId, content })
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Update error:', error);
      alert('An error occurred while updating.');
    }
  };

  // ✅ Handle product deletion
  const handleDelete = async () => {
    if (!selectedId) {
      alert('Please select a product to delete.');
      return;
    }

    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      const response = await fetch('https://topgastro.store/api/delete-product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: selectedId })
      });

      const data = await response.json();
      alert(data.message);

      // Refresh the product list after deletion
      if (data.success) {
        setProducts(products.filter((product) => product.id !== selectedId));
        setSelectedId('');
        setContent('');
      }
    } catch (error) {
      console.error('Delete error:', error);
      alert('An error occurred while deleting.');
    }
  };

  // ✅ Handle new product addition
  const handleAddProduct = async () => {
    const { name, weight, price, quantity, category_id } = newProduct;

    if (!name || !weight || !price || !quantity || !category_id) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('https://topgastro.store/api/add-product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      const result = await response.json();
      alert(result.message);

      if (result.success) {
        setNewProduct({ name: '', weight: '', price: '', quantity: '', category_id: '' }); // Clear form after success
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Aktualizovat informace o produktu</h2>

      {/* ✅ Product selection dropdown */}
      <label>
        Vybrat Produkt:
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">-- Zvolit Product --</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (ID: {product.id})
            </option>
          ))}
        </select>
      </label>
      <br />

      {/* ✅ Textarea to enter updated description */}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Zadejte aktualizovaný popis produktu.."
        rows="5"
        cols="50"
      />
      <br />

      <button onClick={handleUpdate} style={{ marginTop: '1rem', marginRight: '10px' }}>
        Aktualizovat Product
      </button>

      <button onClick={handleDelete} style={{ marginTop: '1rem', backgroundColor: 'red', color: 'white' }}>
        Smazat Product
      </button>

      <h3>Přidat nový produkt</h3>

      {/* ✅ Inputs for new product */}
      <input
        type="text"
        placeholder="Název produktu"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Hmotnost"
        value={newProduct.weight}
        onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
      />
      <input
        type="number"
        placeholder="Cena"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Množství"
        value={newProduct.quantity}
        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
      />

      {/* ✅ Category selection dropdown */}
      <label>
        Vybrat kategorii:
        <select value={newProduct.category_id} onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}>
          <option value="">-- Zvolit kategorii --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name} (ID: {category.id})
            </option>
          ))}
        </select>
      </label>
      <br />

      <button onClick={handleAddProduct} style={{ marginTop: '1rem' }}>
        Přidat nový produkt
      </button>
    </div>
  );
}

export default UpdateProducts;

/*

import React, { useState, useEffect } from 'react';

function UpdateProducts() {
  const [products, setProducts] = useState([]); // Fetched products
  const [categories, setCategories] = useState([]); // Fetched categories
  const [selectedId, setSelectedId] = useState(''); // Selected product
  const [content, setContent] = useState(''); // Product content update
  const [newProduct, setNewProduct] = useState({ name: '', weight: '', price: '', quantity: '', category_id: '' });

  // ✅ Fetch products and categories on component mount
  useEffect(() => {
    fetch('https://topgastro.store/api/get-products.php')
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));

    fetch('https://topgastro.store/api/get-categories.php')
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // ✅ Handle product update
  const handleUpdate = async () => {
    if (!selectedId || !content) {
      alert('Please select a product and enter new content.');
      return;
    }

    try {
      const response = await fetch('https://topgastro.store/api/update-content.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: selectedId, content })
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Update error:', error);
      alert('An error occurred while updating.');
    }
  };

  // ✅ Handle new product addition
  const handleAddProduct = async () => {
    const { name, weight, price, quantity, category_id } = newProduct;

    if (!name || !weight || !price || !quantity || !category_id) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('https://topgastro.store/api/add-product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      const result = await response.json();
      alert(result.message);

      if (result.success) {
        setNewProduct({ name: '', weight: '', price: '', quantity: '', category_id: '' }); // Clear form after success
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Update Product Info</h2>

      
      <label>
        Select Product:
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">-- Choose Product --</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (ID: {product.id})
            </option>
          ))}
        </select>
      </label>
      <br />

     
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter updated product description..."
        rows="5"
        cols="50"
      />
      <br />

      <button onClick={handleUpdate} style={{ marginTop: '1rem' }}>
        Update Product
      </button>

      <h3>Add New Product</h3>

      <input
        type="text"
        placeholder="Product Name"
        value={newProduct.name}
        onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Weight"
        value={newProduct.weight}
        onChange={(e) => setNewProduct({ ...newProduct, weight: e.target.value })}
      />
      <input
        type="number"
        placeholder="Price"
        value={newProduct.price}
        onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
      />
      <input
        type="number"
        placeholder="Quantity"
        value={newProduct.quantity}
        onChange={(e) => setNewProduct({ ...newProduct, quantity: e.target.value })}
      />

   
      <label>
        Select Category:
        <select value={newProduct.category_id} onChange={(e) => setNewProduct({ ...newProduct, category_id: e.target.value })}>
          <option value="">-- Choose Category --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name} (ID: {category.id})
            </option>
          ))}
        </select>
      </label>
      <br />

      <button onClick={handleAddProduct} style={{ marginTop: '1rem' }}>
        Add New Product
      </button>
    </div>
  );
}

export default UpdateProducts;








*/






/*import React, { useState, useEffect } from 'react';

function UpdateProducts() {
  const [products, setProducts] = useState([]); // Store fetched products
  const [categories, setCategories] = useState([]); // Store fetched categories
  const [selectedId, setSelectedId] = useState(''); // Store selected product ID for updating
  const [content, setContent] = useState(''); // Store the content to update
  const [productName, setProductName] = useState(''); // New product name
  const [productWeight, setProductWeight] = useState(''); // New product weight
  const [productPrice, setProductPrice] = useState(''); // New product price
  const [productQuantity, setProductQuantity] = useState(''); // New product quantity
  const [selectedCategory, setSelectedCategory] = useState(''); // Selected category for new product

  // ✅ Fetch products from the database on component mount
  useEffect(() => {
    fetch('https://topgastro.store/api/get-products.php') // Create get-products.php
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));

    // Fetch categories from the database
    fetch('https://topgastro.store/api/get-categories.php') // Create get-categories.php
      .then((response) => response.json())
      .then((data) => setCategories(data.categories))
      .catch((error) => console.error('Error fetching categories:', error));
  }, []);

  // ✅ Handle product update
  const handleUpdate = async () => {
    if (!selectedId || !content) {
      alert('Please select a product and enter new content.');
      return;
    }

    try {
      const response = await fetch('https://topgastro.store/api/update-content.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ id: selectedId, content }),
      });

      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Update error:', error);
      alert('An error occurred while updating.');
    }
  };

  // ✅ Handle adding a new product
  const handleAddProduct = async () => {
    if (!productName || !productWeight || !productPrice || !productQuantity || !selectedCategory) {
      alert('Please fill out all fields.');
      return;
    }

    try {
      const response = await fetch('https://topgastro.store/api/add-product.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          name: productName,
          weight: productWeight,
          price: productPrice,
          quantity: productQuantity,
          category_id: selectedCategory, // Send category ID as part of the new product
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert('Product added successfully!');
        setProductName('');
        setProductWeight('');
        setProductPrice('');
        setProductQuantity('');
        setSelectedCategory(''); // Reset category selection
        fetchProducts(); // Refetch the products
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error('Add product error:', error);
      alert('An error occurred while adding the product.');
    }
  };

  // Function to refetch products
  const fetchProducts = () => {
    fetch('https://topgastro.store/api/get-products.php')
      .then((response) => response.json())
      .then((data) => setProducts(data.products))
      .catch((error) => console.error('Error fetching products:', error));
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Update Product Info</h2>

      <label>
        Select Product:
        <select value={selectedId} onChange={(e) => setSelectedId(e.target.value)}>
          <option value="">-- Choose Product --</option>
          {products.map((product) => (
            <option key={product.id} value={product.id}>
              {product.name} (ID: {product.id})
            </option>
          ))}
        </select>
      </label>

      <br />
      
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Enter updated product description..."
        rows="5"
        cols="50"
      />
      <br />

      <button onClick={handleUpdate} style={{ marginTop: '1rem' }}>
        Update Product
      </button>

      <hr />

     
      <h2>Add New Product</h2>
      <label>
        Product Name:
        <input
          type="text"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          placeholder="Enter product name"
        />
      </label>
      <br />
      <label>
        Weight:
        <input
          type="text"
          value={productWeight}
          onChange={(e) => setProductWeight(e.target.value)}
          placeholder="Enter product weight"
        />
      </label>
      <br />
      <label>
        Price:
        <input
          type="number"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          placeholder="Enter product price"
        />
      </label>
      <br />
      <label>
        Quantity:
        <input
          type="number"
          value={productQuantity}
          onChange={(e) => setProductQuantity(e.target.value)}
          placeholder="Enter product quantity"
        />
      </label>
      <br />

     
      <label>
        Select Category:
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">-- Choose Category --</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name} (ID: {category.id})
            </option>
          ))}
        </select>
      </label>
      <br />

      <button onClick={handleAddProduct} style={{ marginTop: '1rem' }}>
        Add New Product
      </button>
    </div>
  );
}

export default UpdateProducts;
*/
