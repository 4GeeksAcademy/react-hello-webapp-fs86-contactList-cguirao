import React from 'react'; 

const ContactCard = ({ contact, onUpdate, onDelete }) => {
  return (
    <div className="contact-resume" key={contact.id}>
      <div className="contact-resume__info">
        <img
          className="contact-resume__img"
          src="https://tse4.mm.bing.net/th?id=OIP.UJXz8XzkiZ_I_650E8LiEQHaEr&pid=Api&P=0&h=180"
          alt="Contact"
        />
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
        <a className="contact-buttons__update" onClick={() => onUpdate(contact)}>
          <i className="fas fa-edit"></i>
        </a>
        <a className="contact-buttons__delete" onClick={() => onDelete(contact)}>
          <i className="fas fa-trash"></i>
        </a>
      </div>
    </div>
  );
};

export default ContactCard; 
