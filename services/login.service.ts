import axios from "../axios/MyAxios";
import { LoginSubmitDataType } from "../screens/SignInScreen/SignInScreen";

function loginUser(body: LoginSubmitDataType) {
  return axios.post('/auth/login', body)
};

const LoginService = {
  loginUser
};

export default LoginService;