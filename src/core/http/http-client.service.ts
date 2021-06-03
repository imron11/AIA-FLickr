import Axios from 'axios';
import { BaseAxiosService } from './base-axios.service';

export class HttpClientService extends BaseAxiosService {
  constructor(baseURL: string) {
    super(Axios.create());
    this.axios.defaults.baseURL = baseURL;
    this.axios.defaults.timeout = 3 * 60 * 1000; // 3 minutes
  }
}