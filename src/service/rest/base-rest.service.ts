import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import _ from "lodash";
import {Alert} from 'react-native';
import { Actions } from "react-native-router-flux";

class BaseRestService {
  
  public wrapError(observable: Observable<any>): Observable<any> {
    return observable.pipe(tap(null, this.catchError));
  }

  private catchError(error: any) {
    console.log('err', error);
    const errMsgList: string[] = _.get(error, 'response.data.messageList', []);
    if (errMsgList && errMsgList.length > 0) {
      Alert.alert('Error', errMsgList.join('\n'));
    } else {
      const errMsg: string = _.get(error, 'response.data.message') ||  _.get(error, 'message') ;
      if (errMsg) {
        Alert.alert('Error', errMsg);
      } else {
        const err = _.get(error, '.toJSON().message', null)
        Alert.alert('Error', err || 'Unknown Error');
      }
    }
    const isInvalidGrant = errMsgList.join(', ').toLowerCase().includes('invalid grant');
    if (isInvalidGrant) {
      Actions.reset('SigninPage');
    }
  }

}

export default BaseRestService;