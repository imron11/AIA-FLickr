import _ from "lodash";
import { Observable } from "rxjs";
import { injectable } from "tsyringe";
import APP_CONSTANT from "../../config/app.constant";
import moment from "moment";
import RNFetchBlob from 'rn-fetch-blob';

import BaseRestService from "./base-rest.service";

@injectable()
class UploadRestService extends BaseRestService {
  public uploadPhoto(imgPath: string, mime: string): Observable<any> {
    return this.wrapError(
      this.httpUpload(
        `${APP_CONSTANT.BASE_URL}`,
        imgPath,
        mime,
      ),
    );
  }

  private httpUpload(
    url: string,
    imgPath: string,
    mime: string,
  ): Observable<any> {
    console.log(url);
    return new Observable(subcriber => {
      RNFetchBlob.fetch(
        'POST',
        url,
        {
          'Content-Type': 'multipart/form-data',
        },
        [
          {
            name: 'file',
            filename: `${moment().format('YYYYMMDDHHMMss')}.jpg`,
            type: mime,
            data: RNFetchBlob.wrap(imgPath),
          }
        ],
      )
        .then(resp => resp.json())
        .then(json => subcriber.next(json))
        .catch(err => {
          console.log(err);
          subcriber.error(err);
        });
    });
  }
}

export default UploadRestService;