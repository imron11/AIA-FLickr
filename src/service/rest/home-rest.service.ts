import BaseRestService from "./base-rest.service";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { injectable } from "tsyringe";
import APP_CONSTANT from "../../config/app.constant";
import { HttpClientService } from "../../core/http/http-client.service";
import { authenticationStorageService } from "../../core/auth";

@injectable()
class HomeRestService extends BaseRestService {

  private get http() {
    return new HttpClientService(APP_CONSTANT.BASE_URL);
  }

  public getListImage(tags?: string): Observable<any> {
    if (tags !== "") {
      return this.wrapError(
        this.http.get(`&tags=${tags}`)
      );
    } else {
      return this.wrapError(
        this.http.get('')
      );
    }
  }

}

export default HomeRestService;