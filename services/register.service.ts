import axios from "../axios/MyAxios";

function registerUser(body: any) {
  return axios.post('/users', body)
};

const RegisterService = {
  registerUser
};

export default RegisterService;