import React, { useState } from 'react';
import './MedForm.css';

function MedForm() {
  const [formData, setFormData] = useState({
    medicineName: '',
    quantity: '',
    location: '',
    email: '',
    expiryDate: '',
    donationTime: '', // Add the new state for time
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const donationData = {
        ...formData,
        status: 'pending',
        createdAt: new Date().toISOString(), 
      };

      const response = await fetch('http://localhost:5000/submit-medicine', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(donationData)
      });
      if (response.ok) {
        console.log('Donation submitted successfully.');
      } else {
        console.error('Failed to submit donation.');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
    }
  };

  return (
    <section className="header">
      <div className="wrapper">
        <div className="card">
          <div className="title">
            <h2>Medicines Donation Form</h2>
          </div>
          <div className="form-content">
            <form onSubmit={handleSubmit} action="/submit-medicine" id="donationForm">
              <div className="input_wrap">
                <label htmlFor="medicineName">Medicine Name</label>
                <input
                  type="text"
                  name="medicineName"
                  id="medicineName"
                  placeholder="Enter the medicine name"
                  value={formData.medicineName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input_wrap">
                <label htmlFor="quantity">Quantity</label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="Enter the quantity"
                  value={formData.quantity}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input_wrap">
                <label htmlFor="location">Hospital Name</label>
                <input
                  type="text"
                  name="location"
                  id="location"
                  placeholder="Enter the hospital name"
                  value={formData.location}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input_wrap">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input_wrap">
                <label htmlFor="expiryDate">Expiry Date</label>
                <input
                  type="date"
                  name="expiryDate"
                  id="expiryDate"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input_wrap">
                <label htmlFor="donationTime">Donation time:</label>
                <input
                  type="time"
                  name="donationTime"
                  id="donationTime"
                  value={formData.donationTime}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <input type="submit" className="button" value="Donate Now" />
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MedForm;
