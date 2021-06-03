import BaseRestService from "./base-rest.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { injectable } from "tsyringe";
import APP_CONSTANT from "../../config/app.constant";
import { HttpClientService } from "../../core/http/http-client.service";
import { authenticationStorageService } from "../../core/auth";

@injectable()
class SigninRestService extends BaseRestService {

  private get http() {
    return new HttpClientService(APP_CONSTANT.BASE_URL);
  }

  public loginByEmail(email: string, password: any): Observable<any> {
    return this.wrapError(
      this.http.post(`/login`, { email, password }).pipe(
        tap(res => {
          authenticationStorageService.setEmail(res.email);
          authenticationStorageService.setRole(res.role);
          authenticationStorageService.setName(res.name);
          authenticationStorageService.setAccessToken(res.token);
        })
      )
    );
  }

}

export default SigninRestService;