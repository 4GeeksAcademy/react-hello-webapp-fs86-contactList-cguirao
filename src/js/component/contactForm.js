import React, { useState, useEffect } from "react";

const ContactForm = ({ formData, isContactEmpty, onSubmit }) => {
  const [name, setName] = useState(formData.name || "");
  const [phone, setPhone] = useState(formData.phone || "");
  const [email, setEmail] = useState(formData.email || "");
  const [address, setAddress] = useState(formData.address || "");
  const [id, setId] = useState(formData.id || null);
  
  useEffect(() => {
    setName(name || "");
    setPhone(phone || "");
    setEmail(email || "");
    setAddress(address || "");
  }, []); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    onSubmit({ name, phone, email, address,id });
  };

  return (
    <form onSubmit={handleSubmit} className="container-body">
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">
          Full name
        </label>
        <input
          id="fullName"
          name="name"
          type="text"
          className="form-control"
          placeholder="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)} 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)} 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">
          Phone
        </label>
        <input
          id="phone"
          name="phone"
          type="text"
          className="form-control"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)} 
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">
          Address
        </label>
        <input
          id="address"
          name="address"
          type="text"
          className="form-control"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)} 
        />
      </div>
      <button type="submit" className="btn btn-primary">
        {isContactEmpty ? "Create Contact" : "Update Contact"}
      </button>
    </form>
  );
};

export default ContactForm;
