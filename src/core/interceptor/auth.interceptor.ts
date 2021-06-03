import * as _ from 'lodash';
import "reflect-metadata";
import { authenticationStorageService } from "../auth/";
import { AxiosInstance, AxiosStatic } from 'axios';

class AuthInterceptor {

  setInterceptors(axios: AxiosInstance | AxiosStatic) {
    axios.interceptors.request.use(request => {
      if (authenticationStorageService.accessToken) {
        request.headers.common.Authorization = `Bearer ${authenticationStorageService.accessToken}`;
      }
      return request;
    });

    axios.interceptors.response.use(response => {
      return response;
    }, error => {
      const response = error.response;
      if (response && response.status === 401) {
        // do something here...
      } else {
        throw error;
      }
    });
  }
  
}

export default AuthInterceptor;