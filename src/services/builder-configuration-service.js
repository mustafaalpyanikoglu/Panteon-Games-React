import axios, { HttpStatusCode } from 'axios';
import constants from '../constants/constants';
import appMessages from '../constants/app-messages';
import Cookies from 'js-cookie';

export default class BuildingConfigService {
  // Added building configuration
  add = async (requestModel) => {
    try {
      const response = await axios.post(
        `${constants.API_URL}/buildingconfigs/add`,
        requestModel,
        {
          baseURL: constants.API_URL,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      );
      if (response && response.status === HttpStatusCode.Created) {
        return { message: appMessages.ADD_SUCCESSFUL, isSuccess: true, data: response.data };
      }
    } catch (error) {
      if (!error.response) {
        return { message: appMessages.NETWORK_ERROR, isSuccess: false };
      } else {
        return { message: error.response.data.detail || appMessages.ERROR, isSuccess: false };
      }
    }
  };

  // Delete building configuration
  delete = async (requestModel) => {
    try {
      const response = await axios.delete(
        `${constants.API_URL}/buildingconfigs/delete`,
        {
          data: requestModel,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      );
      if (response && response.status === HttpStatusCode.Ok) {
        return { message: appMessages.DELETE_SUCCESSFUL, isSuccess: true, data: response.data };
      }
    } catch (error) {
      if (!error.response) {
        return { message: appMessages.NETWORK_ERROR, isSuccess: false };
      } else {
        return { message: error.response.data.detail || appMessages.ERROR, isSuccess: false };
      }
    }
  };

  // Update building configuration
  update = async (requestModel) => {
    try {
      const response = await axios.put(
        `${constants.API_URL}/buildingconfigs/update`,
        requestModel,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      );
      if (response && response.status === HttpStatusCode.Ok) {
        return { message: appMessages.UPDATE_SUCCESSFUL, isSuccess: true, data: response.data };
      }
    } catch (error) {
      if (!error.response) {
        return { message: appMessages.NETWORK_ERROR, isSuccess: false };
      } else {
        return { message: error.response.data.detail || appMessages.ERROR, isSuccess: false };
      }
    }
  };

  // Get building configuration list
  getList = async () => {
    try {
      const response = await axios.get(
        `${constants.API_URL}/buildingconfigs/getlist`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      );
      if (response && response.status === HttpStatusCode.Ok) {
        return { message: appMessages.GET_LIST_SUCCESSFUL, isSuccess: true, data: response.data };
      }
    } catch (error) {
      if (!error.response) {
        return { message: appMessages.NETWORK_ERROR, isSuccess: false };
      } else {
        return { message: error.response.data.detail || appMessages.ERROR, isSuccess: false };
      }
    }
  };

  // Get building configuration by id
  getById = async (id) => {
    try {
      const response = await axios.get(
        `${constants.API_URL}/buildingconfigs/${id}`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      );
      if (response && response.status === HttpStatusCode.Ok) {
        return { message: appMessages.GET_BY_ID_SUCCESSFUL, isSuccess: true, data: response.data };
      }
    } catch (error) {
      if (!error.response) {
        return { message: appMessages.NETWORK_ERROR, isSuccess: false };
      } else {
        return { message: error.response.data.detail || appMessages.ERROR, isSuccess: false };
      }
    }
  };
}
