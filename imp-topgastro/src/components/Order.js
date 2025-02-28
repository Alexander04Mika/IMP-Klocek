import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import './Order.css';
import logo from './assets/logo.svg';
import logo2 from './assets/logo2.png';
import { Link } from "react-router-dom";

function Order() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    company: "",
    ico: "",
    message: "",
    deliveryDate: "",
  });

  const [productCategories, setProductCategories] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [finalOrder, setFinalOrder] = useState({});

  // 🔹 Fetch products from MySQL database
  useEffect(() => {
    fetch("https://topgastro.store/api/get-products.php")
      .then((response) => response.json())
      .then((data) => {
        const categorizedProducts = data.products.reduce((acc, product) => {
          const category = product.category_name || "Uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});
        setProductCategories(categorizedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // 🔹 Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Add product to the cart (Basket)
  const handleProductSelect = (category, product) => {
    const existingProduct = selectedProducts.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      setSelectedProducts([...selectedProducts]);
    } else {
      setSelectedProducts([...selectedProducts, { ...product, category, quantity: 1 }]);
    }
  };

  // 🔹 Remove product from the cart
  const handleRemoveFromCart = (index) => {
    const updatedCart = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedCart);
  };

  // 🔹 Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.email) errors.email = "E-mail je povinný";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Neplatný e-mail";

    if (!formData.phone) errors.phone = "Telefon je povinný";
    else if (!/^\d{9}$/.test(formData.phone)) errors.phone = "Telefonní číslo musí mít 9 číslic";

    if (!formData.ico) errors.ico = "IČO je povinné";
    else if (!/^\d{8}$/.test(formData.ico)) errors.ico = "IČO musí mít 8 číslic";

    if (!formData.deliveryDate) errors.deliveryDate = "Datum dodání je povinné";

    if (selectedProducts.length === 0) errors.products = "Musíte vybrat alespoň jeden produkt";

    return errors;
  };

  // 🔹 Submit order for review
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setShowSummary(true);
      setFinalOrder({
        ...formData,
        orderDate: new Date().toLocaleDateString("cs-CZ"),
        selectedProducts,
        totalPrice: selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0),
      });
    } else {
      setErrors(newErrors);
    }
  };

  // 🔹 Send Email using EmailJS
  const handleConfirmOrder = () => {
    const emailContent = {
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      ico: formData.ico,
      orderDate: new Date().toLocaleDateString("cs-CZ"),
      deliveryDate: formData.deliveryDate,
      product: finalOrder.selectedProducts
        .map((product) => `${product.name} (${product.weight}, ${product.quantity} ks)`)
        .join(", "),
      message: formData.message,
    };

    emailjs
      .send(
        "service_rcxjnlp", // Your EmailJS service ID
        "template_ezkmsvo", // Your EmailJS template ID
        emailContent,
        "OObsgmI8imuCjB3De" // Your EmailJS user ID
      )
      .then(
        () => {
          setSuccessMessage("Formulář byl úspěšně odeslán!");
          setShowSummary(false);
          setFormData({ email: "", phone: "", company: "", ico: "", message: "", deliveryDate: "" });
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
          <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Společnost" />
          <input type="text" name="ico" value={formData.ico} onChange={handleChange} placeholder="IČO" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" />
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefon" />
          <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} />

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
            </div>
          ))}

          <h3>🛒 Košík</h3>
          <ul>
            {selectedProducts.map((item, index) => (
              <li key={index}>
                {item.name} - {item.weight} ({item.quantity} ks)
                <button onClick={() => handleRemoveFromCart(index)}>Odebrat</button>
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


/*
import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import './Order.css';
import logo from './assets/logo.svg';
import logo2 from './assets/logo2.png';
import { Link } from "react-router-dom";

function Order() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    company: "",
    ico: "",
    message: "",
    deliveryDate: "",
  });

  const [productCategories, setProductCategories] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [finalOrder, setFinalOrder] = useState({});

  // 🔹 Fetch products from MySQL database
  useEffect(() => {
    fetch("https://topgastro.store/api/get-products.php")
      .then((response) => response.json())
      .then((data) => {
        const categorizedProducts = data.products.reduce((acc, product) => {
          const category = product.category_name || "Uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});
        setProductCategories(categorizedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  // 🔹 Handle form input changes
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🔹 Add product to the cart
  const handleProductSelect = (category, product) => {
    const existingProduct = selectedProducts.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      setSelectedProducts([...selectedProducts]);
    } else {
      setSelectedProducts([...selectedProducts, { ...product, category, quantity: 1 }]);
    }
  };

  // 🔹 Remove product from the cart
  const handleRemoveFromCart = (index) => {
    const updatedCart = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedCart);
  };

  // 🔹 Validate form
  const validateForm = () => {
    const errors = {};

    if (!formData.email) errors.email = "E-mail je povinný";
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = "Neplatný e-mail";

    if (!formData.phone) errors.phone = "Telefon je povinný";
    else if (!/^\d{9}$/.test(formData.phone)) errors.phone = "Telefonní číslo musí mít 9 číslic";

    if (!formData.ico) errors.ico = "IČO je povinné";
    else if (!/^\d{8}$/.test(formData.ico)) errors.ico = "IČO musí mít 8 číslic";

    if (!formData.deliveryDate) errors.deliveryDate = "Datum dodání je povinné";

    if (selectedProducts.length === 0) errors.products = "Musíte vybrat alespoň jeden produkt";

    return errors;
  };

  // 🔹 Submit order for review
  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      setShowSummary(true);
      setFinalOrder({
        ...formData,
        orderDate: new Date().toLocaleDateString("cs-CZ"),
        selectedProducts,
        totalPrice: selectedProducts.reduce((total, product) => total + product.price * product.quantity, 0),
      });
    } else {
      setErrors(newErrors);
    }
  };

  // 🔹 Send Email using EmailJS
  const handleConfirmOrder = () => {
    const emailContent = {
      email: formData.email,
      phone: formData.phone,
      company: formData.company,
      ico: formData.ico,
      orderDate: new Date().toLocaleDateString("cs-CZ"),
      deliveryDate: formData.deliveryDate,
      product: finalOrder.selectedProducts
        .map((product) => `${product.name} (${product.weight}, ${product.quantity} ks)`)
        .join(", "),
      message: formData.message,
    };

    emailjs
      .send(
        "service_rcxjnlp", // Your EmailJS service ID
        "template_ezkmsvo", // Your EmailJS template ID
        emailContent,
        "OObsgmI8imuCjB3De" // Your EmailJS user ID
      )
      .then(
        () => {
          setSuccessMessage("Formulář byl úspěšně odeslán!");
          setShowSummary(false);
          setFormData({ email: "", phone: "", company: "", ico: "", message: "", deliveryDate: "" });
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
          <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Společnost" />
          <input type="text" name="ico" value={formData.ico} onChange={handleChange} placeholder="IČO" />
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" />
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Telefon" />
          <input type="date" name="deliveryDate" value={formData.deliveryDate} onChange={handleChange} />

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
            </div>
          ))}

          <button type="submit" className="order-btn">Odeslat</button>
        </form>
      )}
    </div>
  );
}

export default Order;



import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import './Order.css';
import logo from './assets/logo.svg';
import logo2 from './assets/logo2.png';
import { Link } from "react-router-dom";

function Order() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    company: "",
    ico: "",
    message: "",
    deliveryDate: "",
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
          const category = product.category_name || "Uncategorized";
          if (!acc[category]) acc[category] = [];
          acc[category].push(product);
          return acc;
        }, {});
        setProductCategories(categorizedProducts);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleProductSelect = (category, product) => {
    const existingProduct = selectedProducts.find((item) => item.id === product.id);
    if (existingProduct) {
      existingProduct.quantity += 1;
      setSelectedProducts([...selectedProducts]);
    } else {
      setSelectedProducts([...selectedProducts, { ...product, category, quantity: 1 }]);
    }
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

      <h2>Vyberte produkty</h2>
      {Object.entries(productCategories).map(([category, products]) => (
        <div key={category}>
          <h3>{category}</h3>
          <ul>
            {products.map((product) => (
              <li key={product.id}>
                {product.name} - {product.weight}
                <button onClick={() => handleProductSelect(category, product)}>
                  Přidat
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Order;
*/






/*
import React, { useState, useEffect } from "react";
import emailjs from "emailjs-com";
import './Order.css';
import logo from './assets/logo.svg'; 
import logo2 from './assets/logo2.png';
import { Link } from "react-router-dom";

function Order() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    company: "",
    ico: "",
    message: "",
    deliveryDate: "",
  });

  const [productCategories, setProductCategories] = useState({});
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [showSummary, setShowSummary] = useState(false);
  const [finalOrder, setFinalOrder] = useState({});

  useEffect(() => {
    fetch("/products.json")
      .then((response) => response.json())
      .then((data) => setProductCategories(data))
      .catch((error) => console.error("Error fetching JSON data:", error));
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleProductSelect = (category, product) => {
    const existingProduct = selectedProducts.find(
      (item) => item.name === product.name
    );
    if (existingProduct) {
      existingProduct.quantity += 1;
      setSelectedProducts([...selectedProducts]);
    } else {
      setSelectedProducts([...selectedProducts, { ...product, category, quantity: 1 }]);
    }
  };

  const handleRemoveFromCart = (index) => {
    const updatedCart = selectedProducts.filter((_, i) => i !== index);
    setSelectedProducts(updatedCart);
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.email) {
      errors.email = "E-mail je povinný";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "E-mail musí obsahovat @";
    }

    if (!formData.phone) {
      errors.phone = "Telefon je povinný";
    } else if (!/^\d{9}$/.test(formData.phone)) {
      errors.phone = "Telefonní číslo musí mít 9 číslic";
    }

    if (!formData.ico) {
      errors.ico = "IČO je povinné";
    } else if (!/^\d{8}$/.test(formData.ico)) {
      errors.ico = "IČO musí mít 8 číslic";
    }

    if (!formData.deliveryDate) {
      errors.deliveryDate = "Datum dodání je povinné";
    }

    if (selectedProducts.length === 0)
      errors.products = "Musíte vybrat alespoň jeden produkt";

    return errors;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      const orderDate = new Date().toLocaleDateString("cs-CZ");

      setShowSummary(true);
      setFinalOrder({
        email: formData.email,
        phone: formData.phone,
        company: formData.company,
        ico: formData.ico,
        orderDate: orderDate,
        deliveryDate: formData.deliveryDate,
        selectedProducts,
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

    const productDetails = finalOrder.selectedProducts
      .map(
        (product) =>
          `${product.name} (${product.weight}), Množství: ${product.quantity}, Cena: ${product.price} Kč`
      )
      .join("<br>");

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
            product: productDetails, 
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
        <img id="order-logo" src={logo} alt="Logo" />
      </Link>

      <Link to="../Gastro" id="order-logo2-link">
        <img id="order-logo2" src={logo2} alt="Logo2" />
      </Link>

    <div className="pdf-link-container">
    Starý Způsob:  <a href="/objednavky.pdf" target="_blank" rel="noopener noreferrer" className="pdf-link-text">Objednavkový formulář </a> 
    </div>

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
          <button onClick={handleCancelOrder} className="order-btn">Zrušit</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="order-form">
          <label>Společnost (Zakazník):</label>
          <input
            type="text"
            name="company"
            value={formData.company}
            onChange={handleChange}
            placeholder="Název společnosti"
          />

          <label>IČO:</label>
          <input
            type="text"
            name="ico"
            value={formData.ico}
            onChange={handleChange}
            placeholder="IČO"
          />
          {errors.ico && <p className="error-message">{errors.ico}</p>}

          <label>E-mail:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Váš e-mail"
          />
          {errors.email && <p className="error-message">{errors.email}</p>}

          <label>Telefon:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            placeholder="Váš telefon"
          />
          {errors.phone && <p className="error-message">{errors.phone}</p>}

          <label>Datum dodání:</label>
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
                    {product.name} - {product.weight}
                    <button
                      type="button"
                      onClick={() => handleProductSelect(category, product)}
                      className="order-btn"
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
                {item.name} - {item.weight} ({item.quantity} ks) z kategorie {item.category}
                <button
                  type="button"
                  onClick={() => handleRemoveFromCart(index)}
                  className="order-btn"
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

          <button type="submit" className="order-btn">
            Odeslat
          </button>

        </form>
      )}
    </div>
  );
}

export default Order;


*/