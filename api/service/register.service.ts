import axios from "../constants/MyAxios";

function registerUser(body: any) {
  return axios.post('/users', body)
};

const RegisterService = {
  registerUser
};

export default RegisterService;