import React, { useState } from 'react';
import '../../App.css';
import './Order.css'; // Přidejte stylování pro formulář

function Order() {

   <h1>Pokus od Umělé inteligence</h1>
  // 🟢 Stavové proměnné pro formulářová pole
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    product: '',
    message: ''
  });

  // 🟢 Stav pro chybové zprávy
  const [errors, setErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');

  // 🟢 Zpracování změn ve formuláři
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // 🟢 Odeslání formuláře
  const handleSubmit = (event) => {
    event.preventDefault(); // Zabraňte obnově stránky
    const newErrors = validateForm();

    if (Object.keys(newErrors).length === 0) {
      // Simulace odeslání dat
      console.log('Odesílání dat: ', formData);
      setSuccessMessage('Formulář byl úspěšně odeslán!');
      // Vyčistíme formulář
      setFormData({ name: '', email: '', phone: '', product: '', message: '' });
    } else {
      setErrors(newErrors);
    }
  };

  // 🟢 Validace formuláře
  const validateForm = () => {
    const errors = {};
    if (!formData.name) errors.name = 'Jméno je povinné';
    if (!formData.email) {
      errors.email = 'E-mail je povinný';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Neplatný e-mail';
    }
    if (!formData.phone) errors.phone = 'Telefon je povinný';
    if (!formData.product) errors.product = 'Vyberte produkt';
    if (!formData.message) errors.message = 'Zpráva je povinná';

    return errors;
  };

  return (
    <div className='order-container'>
      <h1>Objednávkový formulář</h1>

      {successMessage && <p className="success-message">{successMessage}</p>}

      <form onSubmit={handleSubmit} className='order-form'>
        
        {/* Jméno */}
        <label>Jméno</label>
        <input 
          type="text" 
          name="name" 
          value={formData.name} 
          onChange={handleChange} 
          placeholder="Vaše jméno"
        />
        {errors.name && <p className="error-message">{errors.name}</p>}

        {/* E-mail */}
        <label>E-mail</label>
        <input 
          type="email" 
          name="email" 
          value={formData.email} 
          onChange={handleChange} 
          placeholder="Váš e-mail"
        />
        {errors.email && <p className="error-message">{errors.email}</p>}

        {/* Telefon */}
        <label>Telefon</label>
        <input 
          type="tel" 
          name="phone" 
          value={formData.phone} 
          onChange={handleChange} 
          placeholder="Váš telefon"
        />
        {errors.phone && <p className="error-message">{errors.phone}</p>}

        {/* Produkt */}
        <label>Vyberte produkt</label>
        <select 
          name="product" 
          value={formData.product} 
          onChange={handleChange}
        >
          <option value="">-- Vyberte produkt --</option>
          <option value="Produkt 1">Produkt 1</option>
          <option value="Produkt 2">Produkt 2</option>
          <option value="Produkt 3">Produkt 3</option>
        </select>
        {errors.product && <p className="error-message">{errors.product}</p>}

        {/* Zpráva */}
        <label>Vaše zpráva</label>
        <textarea 
          name="message" 
          value={formData.message} 
          onChange={handleChange} 
          placeholder="Sem napište vaši zprávu"
        ></textarea>
        {errors.message && <p className="error-message">{errors.message}</p>}

        <button type="submit" className='order-button'>Odeslat</button>
      </form>
    </div>
  );
}

export default Order;
