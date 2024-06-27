
import axios from "../api/axios";


const CitoyenService = {
  saveCitoyenAndRendezvous: async (data) => {
    try {
      const response = await axios.post('/citoyens/save', data);

      if (response.status === 200) {
        return { success: true, message: 'Rendez-vous pris avec succéss' };
      } else {
        return { success: false, message: 'Erreur lors de la prise du rendez-vous', data: response.data };
      }
    } catch (error) {
      console.error('Error saving Citoyen and Rendezvous:', error);
      return { success: false, message: 'Vous avez déja un rendez-vous dans cette date', error };
    }
  },
};

export default CitoyenService;