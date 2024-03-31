import axios from "axios";
// GET ALL THE TASK
export const fetchAllTask = async (token) => {
  try {
    const response = await axios.get("http://localhost:8000/api/task", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return null;
  }
};
// DELETE THE TASK
export const deleteTask = async (id, token) => {
  try {
    const data = await axios.delete(`http://localhost:8000/api/task/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.log("Error fetching tasks:", error.message);
  }
};
