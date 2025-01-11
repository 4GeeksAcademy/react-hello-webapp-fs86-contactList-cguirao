import React, { useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useLocation, useNavigate } from "react-router-dom";
import "/workspaces/react-hello-webapp-fs86-contactList-cguirao/src/styles/addContact.css";
import ContactForm from "../component/contactForm";

export const AddContact = () => {
  const { state } = useLocation();
  const { store, actions } = useContext(Context);
  const contact = state?.contact || {};
  const navigate = useNavigate();
  const isContactEmpty = Object.keys(contact).length === 0;
  const title = isContactEmpty ? "New Contact" : "Modify Contact";

  const [formData, setFormData] = useState({
    name: contact.name || "",
    email: contact.email || "",
    phone: contact.phone || "",
    address: contact.address || "",
    id: contact.id || null,
  });

  
  const createContact = async (newFormData) => {
    try {
      const { id, ...newContactData } = newFormData;
      const result = await actions.createContact(newFormData);
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

  const updateContact = async (newFormData) => {
    try {
      
      const { id, ...newContactData } = newFormData;
      const result = await actions.updateContact(newFormData);

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

  const goToContactList = () => {
    navigate(-1);
  };

  return (
    <div className="container">
      <div className="container-title">
        <h1>{title}</h1>
      </div>

      <ContactForm
        formData={formData}
        isContactEmpty={isContactEmpty}
        onSubmit={isContactEmpty ? createContact : updateContact}
      />
    </div>
  );
};
