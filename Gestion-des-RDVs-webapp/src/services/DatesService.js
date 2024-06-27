import axios from "../api/axios";
import moment from 'moment';

const DatesService = {
  fetchUnavailableDates: async () => {
    try {
      const response = await axios.get('/dates/unavailable-dates');
      return response.data;
    } catch (error) {
      console.error('Error fetching unavailable dates:', error);
      throw error;
    }
  },
  getExistingDateInfo: async (selectedDate) => {
    try {
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
      const response = await axios.post(`/dates/findByDateRDV`, {
        dateRDV: formattedDate,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: 'An error occurred while making the request.' };
    }
  },

  updateDate: async (maxRDV, selectedDate) => {
    try {
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
      const response = await axios.put(`/dates/updateMaxRdv/${maxRDV}`, {
        dateRDV: formattedDate,
        
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.status === 200) {
        return { success: true };
      } else {
        const errorMessage = await response.data;
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: 'An error occurred while making the request.' };
    }
  },
  createNewDate: async (maxRDV, selectedDate) => {
    try {
      const formattedDate = moment(selectedDate).format('YYYY-MM-DD');
      const response = await axios.post(`/dates/changemax/${maxRDV}`, {
        dateRDV: formattedDate,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status === 201) {
        return { success: true };
      } else {
        const errorMessage = await response.data;
        return { success: false, error: errorMessage };
      }
    } catch (error) {
      console.error('Error:', error);
      return { success: false, error: 'An error occurred while making the request.' };
    }
  },

  getExistingMaxRDVForAllDates: async () => {
    try {
      const response = await axios.get(`/dates/existingMaxRDVForAllDates`);
      if (!response.ok) {
        throw new Error(`Failed to fetch existing max RDV for all dates: ${response.statusText}`);
      }

      const existingMaxRDVInfo = await response.json();
      return existingMaxRDVInfo;
    } catch (error) {
      console.error('Error:', error);
      throw new Error('An error occurred while fetching existing max RDV for all dates.');
    }
  },
  updateMaxRDVG: async (maxRDVG) => {
    try {
        const response = await axios.put(`/settings/updateMaxRDVG/1/${maxRDVG}`);
        return { response: response.data, error: null };
    } catch (error) {
        console.error('Error updating maxRDVG:', error);
        return { response: null, error: error.message };
    }
},
getMaxRDVG: async () => {
  try {
    const response = await axios.get('/settings/1');
    // Assuming the data you want is in the response.data property
    return response;
  } catch (error) {
    // Handle errors, log them, or throw them if needed
    console.error('Error fetching max RDVG:', error.message);
    throw error;
  }
},
  
};

export default DatesService;