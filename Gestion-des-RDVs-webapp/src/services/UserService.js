import axios from "../api/axios";
const userService = {
    getAllUsers: async () => {
        try {
          const response = await axios.get("/users");
          return response.data;
        } catch (error) {
          console.error('Error fetching all users:', error);
          throw error;
        }
      },
      saveUser: async (user) => {
        try {
          const response = await axios.post("/users/create", user);
          return response.data;
        } catch (error) {
          console.error('Error saving user:', error);
          throw error;
        }
      },

      disableUser: async (userId) => {
        try {
          const response = await axios.put(`/users/disable/${userId}`);
          return response.data;
        } catch (error) {
          console.error(`Error disabling user with ID ${userId}:`, error);
          throw error;
        }
      },
    
      enableUser: async (userId) => {
        try {
          const response = await axios.put(`/users/enable/${userId}`);
          return response.data;
        } catch (error) {
          console.error(`Error enabling user with ID ${userId}:`, error);
          throw error;
        }
      },

      updateUser: async (id, user) => {
        try {
          const response = await axios.put(`/users/${id}`, user);
          return response.data;
        } catch (error) {
          console.error(`Error updating user with ID ${id}:`, error);
          throw error;
        }
      },

      findById: async (userId) => {
        try {
          const response = await axios.get(`/users/${userId}`);
          return response.data;
        } catch (error) {
          console.error(`Error fetching user with ID ${userId}:`, error);
          throw error;
        }
      },

  };
  
  export default userService;