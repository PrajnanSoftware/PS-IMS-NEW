import React, { useState } from 'react';
import axios from 'axios';

const CustomerForm = ({ fetchCustomers }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [country, setCountry] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const customerData = {
      name,
      email,
      phone,
      address: { street, city, state, country, postalCode },
    };
    console.log('Customer Data:', customerData);
    try {
      await axios.post('http://localhost:8080/api/customers', customerData);
      fetchCustomers();
      setName('');
      setEmail('');
      setPhone('');
      setStreet('');
      setCity('');
      setState('');
      setCountry('');
      setPostalCode('');
    } catch (error) {
      console.error('Error creating customer:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Add Customer</h2>
      <div>
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label>Phone:</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
      </div>
      <div>
        <label>Street:</label>
        <input
          type="text"
          value={street}
          onChange={(e) => setStreet(e.target.value)}
        />
      </div>
      <div>
        <label>City:</label>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
      </div>
      <div>
        <label>State:</label>
        <input
          type="text"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />
      </div>
      <div>
        <label>Country:</label>
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />
      </div>
      <div>
        <label>Postal Code:</label>
        <input
          type="text"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
      </div>
      <button type="submit">Add Customer</button>
    </form>
  );
};

export default CustomerForm;
