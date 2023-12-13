import axios from "../axios/MyAxios";

function getAuthorizedUser(token: string) {
  return axios.get("/auth/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

function editUser(id: any, body: any) {
  return axios.put(`/users/${id}`, body);
}

function getUsers() {
  return axios.get(`/users`);
}

const UserService = {
  getAuthorizedUser,
  editUser,
  getUsers
};

export default UserService;
