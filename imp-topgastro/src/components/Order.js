
import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import './Order.css';
import logo from './assets/logo.svg';
import logo2 from './assets/logo2.webp';
import { Link } from "react-router-dom";

function Order() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    company: "",
    ico: "",
    message: "",
  });

  const [productCategories, setProductCategories] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [finalOrder, setFinalOrder] = useState({});

  useEffect(() => {
    fetch("https://topgastro.store/api/get-products.php")
      .then((response) => response.json())
      .then((data) => {
        const categorizedProducts = data.products.reduce((acc, product) => {
          const category = product.category_name || "nezařazené";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});
        setProductCategories(categorizedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductSelect = (category, product) => {
    const existingProduct = selectedProducts.find((item) => item.id === product.id);
    if (existingProduct) {
     
      existingProduct.quantity += 1;
      setSelectedProducts([...selectedProducts]);
    } else {
      
      setSelectedProducts([...selectedProducts, { ...product, category, quantity: 1 }]);
    }
  };

  const handleDecreaseQuantity = (index) => {
    const updatedProducts = [...selectedProducts];
    if (updatedProducts[index].quantity > 1) {
      updatedProducts[index].quantity -= 1; 
    }
    setSelectedProducts(updatedProducts);
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedCart);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.company) errors.company = "Název Společnosti je povinný"; //pokus
    
    if (!formData.email) errors.email = "E-mail je povinný";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Neplatný e-mail";

    if (!formData.phone) errors.phone = "Telefon je povinný";
    else if (!/^\d{9}$/.test(formData.phone)) errors.phone = "Telefonní číslo musí mít 9 číslic";

    if (!formData.ico) errors.ico = "IČO je povinné";
    else if (!/^\d{8}$/.test(formData.ico)) errors.ico = "IČO musí mít 8 číslic";

    if (selectedProducts.length === 0) errors.products = "Musíte vybrat alespoň jeden produkt";

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setShowSummary(true);
      setFinalOrder({
        ...formData,
        selectedProducts,
        totalPrice: selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0),
      });
    } else {
      setErrors(newErrors);
    }
  };

  const handleConfirmOrder = () => {
    const emailContent = {
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      ico: formData.ico,
      product: finalOrder.selectedProducts
        .map((product) => `${product.name} (${product.weight}, ${product.quantity} ks)`)
        .join(", "),
      message: formData.message,
    };

    emailjs
      .send(
        "service_rcxjnlp", 
        "template_ezkmsvo", 
        emailContent,
        "OObsgmI8imuCjB3De" 
      )
      .then(
        () => {
          setSuccessMessage("Formulář byl úspěšně odeslán!");
          setShowSummary(false);
          setFormData({ email: "", phone: "", company: "", ico: "", message: ""});
          setSelectedProducts([]);
        },
        () => setSuccessMessage("Došlo k chybě při odesílání formuláře.")
      );
  };

  return (
    <div className="order-container">
      <h1>Objednávkový formulář</h1>
      <h2>TOP GASTRO CZ s.r.o.</h2>

      <Link to="../Gastro">
        <img id="order-logo" src={logo} alt="Logo" />
      </Link>

      <Link to="../Gastro">
        <img id="order-logo2" src={logo2} alt="Logo2" />
      </Link>

      <h5>
         <a href="/objednavky.pdf" target="_blank" rel="noopener noreferrer" className="pdf-link">
         Objednávkový Formulář (PDF)
        </a>
      </h5>

      {successMessage && <p className="success-message">{successMessage}</p>}

      {showSummary ? (
        <div>
          <h2>Souhrn objednávky</h2>
          <ul>
            {finalOrder.selectedProducts.map((item, index) => (
              <li key={index}>
                {item.name} - {item.weight} ({item.quantity} ks)
              </li>
            ))}
          </ul>
          <p><strong>Celková cena: {finalOrder.totalPrice} Kč</strong></p>
          <button onClick={handleConfirmOrder} className="order-btn">Potvrdit</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="order-form">
          <h6>Společnost:</h6>
          <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Společnost" />
          {errors.company && <p className="error-message">{errors.company}</p>}

          <h4>IČO:</h4>
          <input type="text" name="ico" value={formData.ico} onChange={handleChange} placeholder="IČO" />
          {errors.ico && <p className="error-message">{errors.ico}</p>}

          <h4>E-mail:</h4>
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <h4>Telefon:</h4>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefon" />
          {errors.phone && <p className="error-message">{errors.phone}</p>}

          <h3>Vyberte produkty</h3>
          {Object.entries(productCategories).map(([category, products]) => (
            <div key={category}>
              <h3>{category}</h3>
              <ul>
                {products.map((product) => (
                  <li key={product.id}>
                    {product.name} - {product.weight}
                    <button type="button" onClick={() => handleProductSelect(category, product)}>Přidat</button>
                  </li>
                ))}
              </ul>
              {errors.products && <p className="error-message">{errors.products}</p>}
            </div>
          ))}

          <h3>🛒 Košík</h3>
          <ul>
            {selectedProducts.map((item, index) => (
              <li key={index}>
                {item.name} - {item.weight} ({item.quantity} ks)
                <button onClick={() => handleRemoveFromCart(index)}>Odebrat</button>
                <button onClick={() => handleDecreaseQuantity(index)}>-</button> 
              </li>
            ))}
          </ul>

          <button type="submit" className="order-btn">Odeslat</button>
        </form>
      )}
    </div>
  );
}

export default Order;
