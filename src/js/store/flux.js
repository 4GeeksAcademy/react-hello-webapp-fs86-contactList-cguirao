import { Dispatch } from "../dispatch";

const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white"
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white"
        }
      ],
      agendaName: "Cguirao",
	  contacts:[],
    },
    actions: {
      existeAgenda: async () => {
        const store = getStore();		
        try {
          return await Dispatch.existAgenda(store.agendaName);
        } catch (err) {
          console.error("Error fetch: ",err.message);
        }
       
      },
      createAgenda: async () => {
        const store = getStore();
        try {
          return await Dispatch.createAgenda(store.agendaName);
        } catch (err) {
          console.error("Error fetch: ",err.message);
        }
        
      },
      createContactDemo: async () => {
        const store = getStore();
        try {
          return await Dispatch.createContactDemo(store.agendaName);
        } catch (err) {
          console.error("Error fetching: ",err.message);
        }
        
      },
      getContacts: async () => {
        const store = getStore();
        try {
          const response = await Dispatch.getContact(store.agendaName); 
          if (response && response.contacts) {
            setStore({ contacts: response.contacts });
          }
        } catch (err) {
          console.error("Error fetching contacts:", err.message);
        }
      },
      deleteContact: async (id) => {
        const store = getStore();
        try {
          const response= await Dispatch.deleteContact(store.agendaName,id);
          if (response){
            return response;
          }
        } catch (error) {
         console.error("Error fetch: ",error.message);
        }
        
      },
      createContact: async (object) => {
        const store = getStore();
        try {
          const response= await Dispatch.createContact(store.agendaName, object);
          if(response){
           return response;
          }
        } catch (error) {
          console.error(error.message);
        }
      
      },
      updateContact: async (object) => {
        const store = getStore();
        try {
          const response= await Dispatch.updateContact(store.agendaName, object);
          if (response){
            return response;
          }
        } catch (error) {
          console.err("Error fetch: ",error.message);
        }
       
      },
    }
  };
};

export default getState;
