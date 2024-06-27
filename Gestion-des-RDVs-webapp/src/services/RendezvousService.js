import axios from "../api/axios";
import moment from 'moment';

const Rendezvous = {
  getRendezvousForToday: async () => {
    try {
      const response = await axios.get(`/rendezvous/today`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  getRendezvousByDate: async (selectedDate) => {
    try {
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
      const response = await axios.get(`/rendezvous/byDate/${formattedDate}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getDetailsForTerminatedRendezvous: async (idRDV) => {
    try {
      const response = await axios.get(`/rendezvous/detailsRDV/${idRDV}`);
      return response;
    } catch (error) {
      throw error;
    }
  },
  getDetailsForRendezvous: async (idRDV) => {
    try {
      const response = await axios.get(`/rendezvous/detailRDV/${idRDV}`);
      return response;
    } catch (error) {
      throw error;
    }
  },

  chooseRendezvous: async (idRDV, idEmploye) => {
    try {
      const response = await axios.post(`/rendezvous/choose/${idRDV}/${idEmploye}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },


  endRendezvous: async (idRDV, idEmploye, observations) => {
    try {
      const response = await axios.post(`/rendezvous/end/${idRDV}/${idEmploye}`,
        { observations }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },

 
};



export default Rendezvous;