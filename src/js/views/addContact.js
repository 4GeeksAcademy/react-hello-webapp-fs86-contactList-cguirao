import React, { useState, useEffect } from "react";
import { useLocation,useNavigate } from "react-router-dom"; // Importa useLocation
import "/workspaces/react-hello-webapp-fs86-contactList-cguirao/src/styles/addContact.css";
import { Dispatch } from "../dispatch";

export const AddContact = () => {
  const { state } = useLocation(); 
  const agendaName = state?.agendaName;
  const contact = state?.contact || {};
  const navigate=useNavigate();


  const isContactEmpty = Object.keys(contact).length === 0;
  const title = isContactEmpty ? "New Contact" : "Modify Contact";

  const [formData, setFormData] = useState({
    name: contact.name || "",
    email: contact.email || "",
    phone: contact.phone || "",
    address: contact.address || "",
    id:contact.id || null
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const createContact = async () => {
    try {
      const { id, ...newContactData } = formData;
      const result = await Dispatch.createContact(agendaName, newContactData);
      if (result) {
        alert("Contact created successfully!");
        goToContactList();
      } else {
        alert("Failed to create contact.");
      }
    } catch (error) {
      console.error("Error creating contact:", error);
      alert("An error occurred while creating the contact.");
    }
  };
  
  const updateContact = async () => {
    try {
      const result = await Dispatch.updateContact(agendaName, formData);
      if (result) {
        alert("Contact updated successfully!");
        goToContactList();
      } else {
        alert("Failed to update contact.");
      }
    } catch (error) {
      console.error("Error updating contact:", error);
      alert("An error occurred while updating the contact.");
    }
  };
  
  

  const goToContactList=()=>{
    navigate(-1);
  }



  return (
    <div className="container">
      <div className="container-title">
        <h1>{title}</h1>
      </div>

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
        <button type="submit" className="btn btn-primary" onClick={isContactEmpty ? createContact : updateContact}>
          {isContactEmpty ? "Create Contact" : "Update Contact"}
        </button>
      </div>
    </div>
  );
};
