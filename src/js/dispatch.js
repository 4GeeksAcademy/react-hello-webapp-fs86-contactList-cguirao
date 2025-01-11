export const Dispatch = {
  URL_AGENDA: 'https://playground.4geeks.com/contact/agendas',

  existAgenda: async (agendaName) => {
    try {
      const response = await fetch(`${Dispatch.URL_AGENDA}/${agendaName}`);

      if (response.ok) {
        const data = await response.json();
        return true;
      } else if (response.status === 404) {
        return false;
      } else {
        throw new Error("Error al verificar la agenda");
      }
    } catch (error) {
      console.error("Error al verificar la agenda:", error.message);
      return false;
    }
  },

  createAgenda: async (agendaName) => {
    try {
      const response = await fetch(`${Dispatch.URL_AGENDA}/${agendaName}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          slug: agendaName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(`Error al crear la agenda: ${errorData.message || 'Desconocido'}`);
      }
    } catch (error) {
      console.error("Error al crear la agenda:", error.message);
      return null;
    }
  },

  createContactDemo: async (agendaName) => {
    const urlContactName = `${Dispatch.URL_AGENDA}/${agendaName}/contacts`;
  
    try {
      const response = await fetch(urlContactName, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: 'demo',
          phone: 'demo',
          email: 'demo',
          address: 'demo',
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        return data; 
      } else {
        const errorData = await response.json();
        throw new Error(`Error al crear el contacto demo: ${errorData.message || 'Desconocido'}`);
      }
    } catch (error) {
      console.error("Error al crear el contacto demo:", error.message);
      return null;
    }
  },  

  getContact: async (agendaName) => {
    const urlContactName = `${Dispatch.URL_AGENDA}/${agendaName}/contacts`;

    try {
      const response = await fetch(urlContactName, {
        method: 'GET',
      });

      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        throw new Error(`Error al obtener los contactos: ${errorData.message || 'Desconocido'}`);
      }
    } catch (error) {
      console.error("Error al obtener los contactos:", error.message);
      return null;
    }
  },

  deleteContact: async (agendaName, id) => {
    const urlContactName = `${Dispatch.URL_AGENDA}/${agendaName}/contacts/${id}`;
  
    try {
      const response = await fetch(urlContactName, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (!response.ok) {
        throw new Error(`Error al eliminar el contacto: ${response.statusText} (Código: ${response.status})`);
      }

      return true;
    } catch (error) {
      console.error("Error al eliminar el contacto:", error.message);
      throw error;
    }
  },
  
  createContact: async (agendaName, object) => {
    const urlContactName = `${Dispatch.URL_AGENDA}/${agendaName}/contacts/`;

    try {
      const response = await fetch(urlContactName, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: object.name,
          phone: object.phone,
          email: object.email,
          address: object.address,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al crear el contacto:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error al crear el contacto:", error.message);
      return null;
    }
  },
  updateContact: async (agendaName, contact) => {
    const urlContactNameId = `${Dispatch.URL_AGENDA}/${agendaName}/contacts/${contact.id}`;

    try {
      const response = await fetch(urlContactNameId, {
        method: 'PUT',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contact.name,
          phone: contact.phone,
          email: contact.email,
          address: contact.address,
        }),
      });
      if (response.ok) {
        const data = await response.json();
        return data;
      } else {
        console.error("Error al modificar el contacto:", response.statusText);
        return null;
      }
    } catch (error) {
      console.error("Error al modificar el contacto:", error.message);
      return null;
    }
  }




};
