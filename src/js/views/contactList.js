import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "/workspaces/react-hello-webapp-fs86-contactList-cguirao/src/styles/contactList.css";
import { Dispatch } from "../dispatch";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import DeleteModal from '../component/deleteModal';
import ContactCard from '../component/contactCard';

const API_URL = "https://assets.breatheco.de/apis/fake/contact/";

export const ContactList = () => {
  const agendaName = "CGuirao";
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [contactToDelete, setContactToDelete] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkOrCreateAgenda = async () => {
      setIsLoading(true);

      try {
        const existe = await Dispatch.existAgenda(agendaName);

        if (!existe) {
          const nuevaAgenda = await Dispatch.createAgenda(agendaName);
          if (nuevaAgenda) {
            console.log("Agenda creada con éxito:", nuevaAgenda);
            await Dispatch.createContactDemo(agendaName);
          }
        }

        const contactsList = await Dispatch.getContact(agendaName);
        setContacts(contactsList.contacts);
      } catch (error) {
        setError(error.message);
        console.error("Error:", error.message);
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
      const result = await Dispatch.deleteContact(agendaName, contactToDelete.id);
      console.log();
      if (result) {
        alert("Contact deleted successfully!");
        setContacts(contacts.filter((c) => c.id !== contactToDelete.id));
      } else {
        alert("Failed to delete contact.");
      }
    } catch (error) {
      console.error("Error deleting contact:", error);
      alert("An error occurred while deleting the contact.");
    } finally {
      closeModal();
    }
  };

  const goToAddContact = () => {
    navigate("/addContact", { state: { agendaName } });
  };

  const goToUpdateContact = (contact) => {
    navigate("/addContact", { state: { agendaName, contact } });
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
        {contacts.length > 0 ? (
          contacts.map((contact) => (
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
