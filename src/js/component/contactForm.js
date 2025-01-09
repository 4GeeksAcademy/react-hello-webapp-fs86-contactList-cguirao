import React from "react";

const ContactForm = ({
  formData,
  handleInputChange,
  isContactEmpty,
  onSubmit
}) => {
  return (
    <div className="container-body">
      <div className="mb-3">
        <label htmlFor="fullName" className="form-label">Full name</label>
        <input
          id="fullName"
          name="name"
          type="text"
          className="form-control"
          placeholder="Full name"
          value={formData.name}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">E-mail</label>
        <input
          id="email"
          name="email"
          type="email"
          className="form-control"
          placeholder="E-mail"
          value={formData.email}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="phone" className="form-label">Phone</label>
        <input
          id="phone"
          name="phone"
          type="text"
          className="form-control"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleInputChange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="address" className="form-label">Address</label>
        <input
          id="address"
          name="address"
          type="text"
          className="form-control"
          placeholder="Address"
          value={formData.address}
          onChange={handleInputChange}
        />
      </div>
      <button type="submit" className="btn btn-primary" onClick={onSubmit}>
        {isContactEmpty ? "Create Contact" : "Update Contact"}
      </button>
    </div>
  );
};

export default ContactForm;
