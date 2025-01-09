import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Importa useNavigate
import "/workspaces/react-hello-webapp-fs86-contactList-cguirao/src/styles/contactList.css";
import { Dispatch } from "../dispatch";
import "bootstrap/dist/css/bootstrap.min.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


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
      const result = await Dispatch.deleteContact(agendaName,contactToDelete.id);
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
        <div className="modal show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this contact?</p>
                <p>
                  <strong>Name: </strong>
                  {contactToDelete?.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  {contactToDelete?.email}
                </p>
                <p>
                  <strong>Phone: </strong>
                  {contactToDelete?.phone}
                </p>
                <p>
                  <strong>Address: </strong>
                  {contactToDelete?.address}
                </p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      <div className="contact">
        {contacts.length > 0 ? (
          contacts.map((contact) => (
            <div className="contact-resume" key={contact.id}>
              <div className="contact-resume__info">
                <img className="contact-resume__img" src="https://tse4.mm.bing.net/th?id=OIP.UJXz8XzkiZ_I_650E8LiEQHaEr&pid=Api&P=0&h=180" alt="Contact" />
                <ul className="contact-resume__list">
                  <li>
                    <p>{contact.name}</p>
                    <p>{contact.email}</p>
                    <p>{contact.phone}</p>
                    <p>{contact.address}</p>
                  </li>
                </ul>
              </div>

              <div className="contact-buttons">
                <a className="contact-buttons__update" onClick={() => goToUpdateContact(contact)}>
                  <i className="fas fa-edit"></i>
                </a>
                <a
                  className="contact-buttons__delete"
                  onClick={() => handleDeleteClick(contact)}
                >
                  <i className="fas fa-trash"></i>
                </a>

              </div>
            </div>
          ))
        ) : (
          <p>No contacts available.</p>
        )}
      </div>


    </div>
  );
};
