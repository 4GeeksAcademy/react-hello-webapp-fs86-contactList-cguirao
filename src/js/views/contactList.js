import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import DeleteModal from "../component/deleteModal";
import ContactCard from "../component/contactCard";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "/workspaces/react-hello-webapp-fs86-contactList-cguirao/src/styles/contactList.css";

export const ContactList = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { store, actions } = useContext(Context);

  useEffect(() => {
    const checkOrCreateAgenda = async () => {
      setIsLoading(true);

      try {
        const exists = await actions.existeAgenda();
        
        if (!exists) {
          const newAgenda = await actions.createAgenda();
          if (newAgenda) {
            await actions.createContactDemo();
          }
        }
       
        await actions.getContacts();
      } catch (err) {
        setError(err.message);
        console.error("Error:", err.message);
      } finally {
        setIsLoading(false);
      }
    };

    checkOrCreateAgenda();
  }, []);

  const handleDeleteClick = (contact) => {
    setContactToDelete(contact);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setContactToDelete(null);
  };

  const confirmDelete = async () => {
    try {
      const result = await actions.deleteContact(contactToDelete.id);
      if (result) {
        alert("Contact deleted successfully!");
        await actions.getContacts();
      } else {
        alert("Failed to delete contact.");
      }
    } catch (err) {
      console.error("Error deleting contact:", err.message);
      alert("An error occurred while deleting the contact.");
    } finally {
      closeModal();
    }
  };

  const goToAddContact = () => {
    navigate("/addContact");
  };

  const goToUpdateContact = (contact) => {
    navigate("/addContact", { state: { contact } });
  };

  return (
    <div className="contactList">
      <div className="title">
        <h1>Contact List</h1>
      </div>

      <div className="container-addContact">
        <button type="button" className="btnAddContact btn btn-success" onClick={goToAddContact}>
          Add new contact
        </button>
      </div>

      {isLoading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {showModal && (
        <DeleteModal
          contact={contactToDelete}
          onClose={closeModal}
          onConfirm={confirmDelete}
        />
      )}

      <div className="contact">

       {store.contacts && store.contacts.length > 0 ? ( 
          store.contacts.map((contact) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              onUpdate={goToUpdateContact}
              onDelete={handleDeleteClick}
            />
          ))
        ) : (
          <p>No contacts available.</p>
        )}
      </div>
    </div>
  );
};
