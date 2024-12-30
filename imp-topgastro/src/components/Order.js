import React, { useState } from "react";
import emailjs from "emailjs-com";
import './Order.css'
import logo from './assets/logo.svg'; 
import logo2 from './assets/logo2.png';
import { Link } from "react-router-dom"; 


const productCategories = {
  "Přílohy": [
    { name: "Vaječné kapání do polévky", weight: "5kg", quantity: 1, price: 100 },
    { name: "Bramborové těsto", weight: "5kg", quantity: 1, price: 200 },
    { name: "Bramborové těsto 10kg", weight: "10kg", quantity: 1, price: 350 },
  ],
  "Rýže a Luštěniny": [
    { name: "Rýže dlouhozrnná", weight: "5kg", quantity: 1, price: 120 },
    { name: "Rýže parboiled", weight: "5kg", quantity: 1, price: 130 },
  ],
};

function Order() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    company: "", // For customer company (Zakazník)
    ico: "", // For IČO
    message: "",
    deliveryDate: "", // For delivery date
  });

  const [selectedProducts, setSelectedProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false); // To toggle between form and summary
  const [finalOrder, setFinalOrder] = useState({}); // For storing final order info

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductSelect = (category, product) => {
    const existingProduct = selectedProducts.find(
      (item) => item.name === product.name
    );
    if (existingProduct) {
      existingProduct.quantity += 1; // Increment quantity if product already in cart
      setSelectedProducts([...selectedProducts]);
    } else {
      setSelectedProducts([...selectedProducts, { ...product, category, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedCart);
  };

  // Validace formuláře
  const validateForm = () => {
    const errors = {};

    // Validace pro e-mail
    if (!formData.email) {
      errors.email = "E-mail je povinný";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "E-mail musí obsahovat @";
    }

    // Validace pro telefon (9 místní číslo)
    if (!formData.phone) {
      errors.phone = "Telefon je povinný";
    } else if (!/^\d{9}$/.test(formData.phone)) {
      errors.phone = "Telefonní číslo musí mít 9 číslic";
    }

    // Validace pro IČO (8 místní číslo)
    if (!formData.ico) {
      errors.ico = "IČO je povinné";
    } else if (!/^\d{8}$/.test(formData.ico)) {
      errors.ico = "IČO musí mít 8 číslic";
    }

    // Validace pro datum dodání
    if (!formData.deliveryDate) {
      errors.deliveryDate = "Datum dodání je povinné";
    }

    // Validace pro produkty
    if (selectedProducts.length === 0)
      errors.products = "Musíte vybrat alespoň jeden produkt";

    return errors;
  };const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();
  
    if (Object.keys(newErrors).length === 0) {
      // You no longer need this `orderSummary` variable as `setFinalOrder` handles it
      const productList = selectedProducts
        .map(
          (product) =>
            `${product.name} (${product.weight}, ${product.quantity} ks)`
        )
        .join(", ");
      const orderDate = new Date().toLocaleDateString("cs-CZ"); // Current date as order date
  
      // Directly set the final order state
      setShowSummary(true);
      setFinalOrder({
        email: formData.email,
        phone: formData.phone,
        company: formData.company, // Customer's company name
        ico: formData.ico, // Customer's IČO
        orderDate: orderDate, // Order date
        deliveryDate: formData.deliveryDate, // Delivery date
        product: productList, // Products list
        message: formData.message,
        selectedProducts, // Store selected products
        totalPrice: selectedProducts.reduce(
          (total, product) => total + product.price * product.quantity,
          0
        ),
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
      orderDate: new Date().toLocaleDateString("cs-CZ"),
      deliveryDate: formData.deliveryDate,
      product: finalOrder.selectedProducts
        .map(
          (product) =>
            `${product.name} (${product.weight}, ${product.quantity} ks)`
        )
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
          setFormData({
            email: "",
            phone: "",
            company: "",
            ico: "",
            message: "",
            deliveryDate: "",
          });
          setSelectedProducts([]);
        },
        () => setSuccessMessage("Došlo k chybě při odesílání formuláře.")
      );
  };

  const handleCancelOrder = () => {
    setShowSummary(false);
    setSelectedProducts([]);
    setFormData({
      email: "",
      phone: "",
      company: "",
      ico: "",
      message: "",
      deliveryDate: "",
    });
  };

  return (
    <div className="order-container">
      <h1>Objednávkový formulář</h1>
      <h2>TOP GASTRO CZ s.r.o., Višňova 1240, 506 01 Jičín, tel: 420 702 070 329, www.topgastrocz.cz</h2>
      <Link to="../Gastro" id="order-logo-link">
      <img id="order-logo" src={logo} alt="Logo"/>
      </Link>

      <Link to="../Gastro" id="order-logo2-link">
      <img id="order-logo2" src={logo2} alt="Logo2"/>
      </Link>
      
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
          <button onClick={handleConfirmOrder}>Potvrdit</button>
          <button onClick={handleCancelOrder}>Zrušit</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="order-form">
          <label>Společnost (Zakazník)</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Název společnosti"
          />

          <label>IČO</label>
          <input
            type="text"
            name="ico"
            value={formData.ico}
            onChange={handleChange}
            placeholder="IČO"
          />
          {errors.ico && <p className="error-message">{errors.ico}</p>}

          <label>E-mail</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Váš e-mail"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <label>Telefon</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Váš telefon"
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}

          <label>Datum dodání</label>
          <input
            type="date"
            name="deliveryDate"
            value={formData.deliveryDate}
            onChange={handleChange}
          />
          {errors.deliveryDate && <p className="error-message">{errors.deliveryDate}</p>}

          <label>Vyberte produkty</label>
          {Object.entries(productCategories).map(([category, products]) => (
            <div key={category}>
              <h3>{category}</h3>
              <ul>
                {products.map((product, index) => (
                  <li key={index}>
                    {product.name} - {product.weight} ({product.quantity} ks)
                    <button
                      type="button"
                      onClick={() => handleProductSelect(category, product)}
                    >
                      Přidat
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          {errors.products && <p className="error-message">{errors.products}</p>}

          <h2>Košík</h2>
          <ul>
            {selectedProducts.map((item, index) => (
              <li key={index}>
                {item.name} - {item.weight} ({item.quantity} ks) z kategorie{" "}
                {item.category}
                <button
                  type="button"
                  onClick={() => handleRemoveFromCart(index)}
                  style={{ marginLeft: "10px" }}
                >
                  Odebrat
                </button>
              </li>
            ))}
          </ul>

          <label>Vaše zpráva</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Sem napište vaši zprávu"
          ></textarea>

          <button type="submit" className="order-button">
            Odeslat
          </button>
        </form>
      )}
    </div>
  );
}

export default Order;
