import Axios from 'axios';
import { BaseAxiosService } from './base-axios.service';
import { authInterceptor } from '../interceptor';

export class HttpClientInterceptedService extends BaseAxiosService {
  constructor(baseURL: string) {
    super(Axios.create());
    this.axios.defaults.baseURL = baseURL;
    this.axios.defaults.timeout = 30000;
    authInterceptor.setInterceptors(this.axios);
  }
}
