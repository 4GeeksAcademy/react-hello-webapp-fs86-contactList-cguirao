import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "/workspaces/react-hello-webapp-fs86-contactList-cguirao/src/styles/addContact.css";
import { Dispatch } from "../dispatch";
import ContactForm from "../component/contactForm";

export const AddContact = () => {
  const { state } = useLocation();
  const agendaName = state?.agendaName;
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
        handleInputChange={handleInputChange}
        isContactEmpty={isContactEmpty}
        onSubmit={isContactEmpty ? createContact : updateContact}
      />
    </div>
  );
};
