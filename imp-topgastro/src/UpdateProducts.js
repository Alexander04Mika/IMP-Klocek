import React, { useState, useEffect } from 'react';

function UpdateProducts() {
  const [products, setProducts] = useState([]); 
  const [categories, setCategories] = useState([]); 
  const [selectedId, setSelectedId] = useState(''); 
  const [content, setContent] = useState(''); 
  const [newProduct, setNewProduct] = useState({ name: '', weight: '', price: '', quantity: '', category_id: '' });

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
        setNewProduct({ name: '', weight: '', price: '', quantity: '', category_id: '' }); 
      }
    } catch (error) {
      console.error('Error adding product:', error);
      alert('An error occurred while adding the product.');
    }
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Aktualizovat informace o produktu</h2>

  
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
