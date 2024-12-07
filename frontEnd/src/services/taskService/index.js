import axios from "axios";
import environment from "../../../envirment.js";

var token = localStorage.getItem("token");
// TODO
// get token
// add new task
// get one task
// GET ALL THE TASK
// update task
// get user infor
// DELETE THE TASK
export default async (token) => {
  try {
    const response = await axios.get(`${environment.baseUrl}/api/task`, {
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
// working delete  task
export const deleteTask = async (id, token) => {
  try {
    await axios
      .delete(`${environment.baseUrl}/api/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        res.data;
      });
  } catch (error) {
    console.log("Error fetching tasks:", error.message);
  }
};

const getuserInfor = async () => {
  const user = await axios.get(`${environment.baseUrl}/api/user/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
