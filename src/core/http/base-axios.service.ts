import Axios, { AxiosInstance, AxiosPromise, AxiosRequestConfig, CancelTokenStatic } from 'axios';
import { Observable } from 'rxjs';
import * as _ from 'lodash';

export class BaseAxiosService {
  private cancelToken: CancelTokenStatic = Axios.CancelToken;

  constructor(public axios: AxiosInstance) { }

  public setBasicAuth(username: string, password: string) {
    this.axios.defaults.auth = {
      username,
      password,
    };
  }

  public patch<T = any, TPayload = any>(
    url: string = '',
    data?: TPayload,
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return Observable.create(observer => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;

      (this.axios.patch(url, data, config) as AxiosPromise)
        .then(response => {
          observer.next(response && response.data);
          observer.complete();
        })
        .catch(error => observer.error(error));

      return () => {
        axiosCancel.cancel();
      };
    });
  }

  public post<T = any, TPayload = any>(
    url: string = '',
    data?: TPayload,
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return Observable.create(observer => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;

      (this.axios.post(url, data, config) as AxiosPromise)
        .then(response => {
          observer.next(response && response.data);
          observer.complete();
        })
        .catch(error => observer.error(error));

      return () => {
        axiosCancel.cancel();
      };
    });
  }

  public put<T = any, TPayload = any>(
    url: string = '',
    data?: TPayload,
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return Observable.create(observer => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;

      (this.axios.put(url, data, config) as AxiosPromise)
        .then(response => {
          observer.next(response && response.data);
          observer.complete();
        })
        .catch(error => observer.error(error));

      return () => {
        axiosCancel.cancel();
      };
    });
  }

  public get<T = any>(
    url: string = '',
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return Observable.create(observer => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;

      (this.axios.get(url, config) as AxiosPromise)
        .then(response => {
          observer.next(response && response.data);
          observer.complete();
        })
        .catch(error => observer.error(error));

      return () => {
        axiosCancel.cancel();
      };
    });
  }

  public delete<T = any>(
    url: string = '',
    config: AxiosRequestConfig = {},
  ): Observable<T> {
    return Observable.create(observer => {
      const axiosCancel = this.cancelToken.source();
      config.cancelToken = axiosCancel.token;

      (this.axios.delete(url, config) as AxiosPromise)
        .then(response => {
          observer.next(response && response.data);
          observer.complete();
        })
        .catch(error => observer.error(error));

      return () => {
        axiosCancel.cancel();
      };
    });
  }

}
