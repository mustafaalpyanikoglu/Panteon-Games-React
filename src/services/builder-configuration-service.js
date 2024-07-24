import axios, { HttpStatusCode } from 'axios';
import constants from '../constants/constants';
import appMessages from '../constants/app-messages';
import Cookies from 'js-cookie';

export default class BuildingConfigService {
  // Added building configuration
  add = async (requestModel) => {
    try {
      const response = await axios.post(
        constants.BUILDING_CONFIGS,
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
      if (error.response.status === HttpStatusCode.InternalServerError) {
        return { message: appMessages.NETWORK_ERROR, isLogin: false };
      } else if (error.response.status === HttpStatusCode.UnprocessableEntity) {
        return { message: error.response.data.Errors[0].Errors[0], isLogin: false };
      } else if (error.response.status === HttpStatusCode.BadRequest) {
        return { message: error.response.data.detail, isLogin: false };
      } else {
        return { message: error.response.data.detail, isLogin: false };
      }
    }
  };

  // Delete building configuration
  delete = async (requestModel) => {
    try {
      const response = await axios.delete(
        constants.BUILDING_CONFIGS,
        {
          baseURL: constants.API_URL,
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
      if (error.response.status === HttpStatusCode.InternalServerError) {
        return { message: appMessages.NETWORK_ERROR, isLogin: false };
      } else if (error.response.status === HttpStatusCode.UnprocessableEntity) {
        return { message: error.response.data.Errors[0].Errors[0], isLogin: false };
      } else if (error.response.status === HttpStatusCode.BadRequest) {
        return { message: error.response.data.detail, isLogin: false };
      } else {
        return { message: error.response.data.detail, isLogin: false };
      }
    }
  };

  // Update building configuration
  update = async (requestModel) => {
    try {
      const response = await axios.put(
        constants.BUILDING_CONFIGS,
        requestModel,
        {
          baseURL: constants.API_URL,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      );
      if (response && response.status === HttpStatusCode.Ok) {
        return { message: appMessages.UPDATE_SUCCESSFUL, isSuccess: true, data: response.data };
      }
    } catch (error) {
      if (error.response.status === HttpStatusCode.InternalServerError) {
        return { message: appMessages.NETWORK_ERROR, isLogin: false };
      } else if (error.response.status === HttpStatusCode.UnprocessableEntity) {
        return { message: error.response.data.Errors[0].Errors[0], isLogin: false };
      } else if (error.response.status === HttpStatusCode.BadRequest) {
        return { message: error.response.data.detail, isLogin: false };
      } else {
        return { message: error.response.data.detail, isLogin: false };
      }
    }
  };

  // Get building configuration list
  getList = async () => {
    try {
      const response = await axios.get(
        constants.BUILDING_CONFIGS,
        {
          baseURL: constants.API_URL,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      );
      if (response && response.status === HttpStatusCode.Ok) {
        return { message: appMessages.GET_LIST_SUCCESSFUL, isSuccess: true, data: response.data };
      }
    } catch (error) {
      if (error.response.status === HttpStatusCode.InternalServerError) {
        return { message: appMessages.NETWORK_ERROR, isLogin: false };
      } else if (error.response.status === HttpStatusCode.UnprocessableEntity) {
        return { message: error.response.data.Errors[0].Errors[0], isLogin: false };
      } else if (error.response.status === HttpStatusCode.BadRequest) {
        return { message: error.response.data.detail, isLogin: false };
      } else {
        return { message: error.response.data.detail, isLogin: false };
      }
    }
  };

  // Get building type list
  getBuildingTypeList = async () => {
    try {
      const response = await axios.get(
        constants.BUILDING_CONFIGS + '/' + constants.GET_BUILDING_TYPE_LIST,
        {
          baseURL: constants.API_URL,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      );
      if (response && response.status === HttpStatusCode.Ok) {
        return { message: appMessages.GET_LIST_SUCCESSFUL, isSuccess: true, data: response.data };
      }
    } catch (error) {
      if (error.response.status === HttpStatusCode.InternalServerError) {
        return { message: appMessages.NETWORK_ERROR, isLogin: false };
      } else if (error.response.status === HttpStatusCode.UnprocessableEntity) {
        return { message: error.response.data.Errors[0].Errors[0], isLogin: false };
      } else if (error.response.status === HttpStatusCode.BadRequest) {
        return { message: error.response.data.detail, isLogin: false };
      } else {
        return { message: error.response.data.detail, isLogin: false };
      }
    }
  };

  // Get building configuration list
  getListWithPagination = async (page = 0, pageSize = 10) => {
    try {
      const url = `${constants.BUILDING_CONFIGS}/${constants.BUILDING_CONFIGS_WITH_PAGINATION}?Page=${page}&PageSize=${pageSize}`;
      const response = await axios.get(
        url,
        {
          baseURL: constants.API_URL,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      );
      if (response && response.status === HttpStatusCode.Ok) {
        console.log('service:' + response.data);
        return { message: appMessages.GET_LIST_SUCCESSFUL, isSuccess: true, data: response.data };
      }
    } catch (error) {
      if (error.response.status === HttpStatusCode.InternalServerError) {
        return { message: appMessages.NETWORK_ERROR, isLogin: false };
      } else if (error.response.status === HttpStatusCode.UnprocessableEntity) {
        return { message: error.response.data.Errors[0].Errors[0], isLogin: false };
      } else if (error.response.status === HttpStatusCode.BadRequest) {
        return { message: error.response.data.detail, isLogin: false };
      } else {
        return { message: error.response.data.detail, isLogin: false };
      }
    }
  };

  // Get building configuration by id
  getById = async (id) => {
    try {
      const response = await axios.get(
        `${constants.BUILDING_CONFIGS}/${id}`,
        {
          baseURL: constants.API_URL,
          headers: {
            Authorization: `Bearer ${Cookies.get('token')}`
          }
        }
      );
      if (response && response.status === HttpStatusCode.Ok) {
        return { message: appMessages.GET_BY_ID_SUCCESSFUL, isSuccess: true, data: response.data };
      }
    } catch (error) {
      if (error.response.status === HttpStatusCode.InternalServerError) {
        return { message: appMessages.NETWORK_ERROR, isLogin: false };
      } else if (error.response.status === HttpStatusCode.UnprocessableEntity) {
        return { message: error.response.data.Errors[0].Errors[0], isLogin: false };
      } else if (error.response.status === HttpStatusCode.BadRequest) {
        return { message: error.response.data.detail, isLogin: false };
      } else {
        return { message: error.response.data.detail, isLogin: false };
      }
    }
  };
}
