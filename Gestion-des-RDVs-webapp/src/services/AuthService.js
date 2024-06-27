import axios from "../api/axios";
const authService = {
    login: async (username, password) => {
      try {
        const response = await axios.post('/auth/login', {
          username,
          password,
        });
        // Assuming the API returns a token or user object upon successful login
        return response.data;
      } catch (error) {
        // Handle errors, e.g., display an error message or log the error
        console.error('Login failed', error);
        throw error;
      }
    },

    changePassword: async ({ username, newPassword }) => {
      try {
        const response = await axios.put("/auth/changePassword", {
          username,
          password: newPassword,
        });
  
        // Assuming the server returns a JSON response
        return response.data;
      } catch (error) {
        // Handle error
        if (error.response) {
          // The request was made, but the server responded with a non-2xx status
          throw new Error(`HTTP error! Status: ${error.response.status}, Message: ${error.response.data.message}`);
        } else if (error.request) {
          // The request was made but no response was received
          throw new Error('No response from the server.');
        } else {
          // Something happened in setting up the request
          throw new Error(`Error setting up the request: ${error.message}`);
        }
      }
    },

  };
  
  export default authService;