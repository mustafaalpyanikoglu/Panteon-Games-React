import axios, { HttpStatusCode } from "axios";
import constants from "../constants/constants";
import Cookies from 'js-cookie';
import appMessages from "../constants/app-messages";

export default class AuthService {
  login = async (requestModel) => {
    try {
      const response = await axios.post(
        constants.LOGIN,
        requestModel,
        {
          baseURL: constants.API_URL,
        });
      if (response && response.status === HttpStatusCode.Ok) {
        Cookies.set('token', response.data.accessToken.token, { expires: new Date(response.data.accessToken.expiration) });
        return { message: appMessages.LOGIN_SUCCESSFUL, isLogin: true };
      }
    } catch (error) {
      if (!error.response) {
        return { message: appMessages.NETWORK_ERROR, isLogin: false };
      } else if (error.response.status === HttpStatusCode.UnprocessableEntity) {
        return { message: error.response.data.Errors[0].Errors[0], isLogin: false };
      } else {
        return { message: error.response.data.detail, isLogin: false };
      }
    }
  };

  register = async (requestModel) => {
    try {
      const response = await axios.post(
        constants.REGISTER,
        requestModel,
        {
          baseURL: constants.API_URL,
        });
      if (response && response.status === HttpStatusCode.Created) {
        return { message: appMessages.REGISTER_SUCCESSFUL, isRegister: true };
      }
    } catch (error) {
      if (!error.response) {
        return { message: appMessages.NETWORK_ERROR, isRegister: false };
      } else if (error.response.status === HttpStatusCode.UnprocessableEntity) {
        return { message: error.response.data.Errors[0].Errors[0], isRegister: false };
      } else {
        return { message: error.response.data.detail, isRegister: false };
      }
    }
  };

  isLoggedIn = () => {
    return Cookies.get('token') ? true : false;
  };

  logout = () => {
    Cookies.remove('token');
  };
}
