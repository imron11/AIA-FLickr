import ErrorStackParser from 'error-stack-parser';
import _ from 'lodash';
import { injectable } from 'tsyringe';

@injectable()
export class ErrorHandlerService {
  public parseErrorToMessages(error: Error, errorMessages: string[] = []) {
    if (_.isArray(error)) {
      _.forEach(error, (errItem) => {
        this.parseErrorToMessages(errItem, errorMessages);
      });
    } else  if (_.isObject(error) && error.hasOwnProperty('toString')) {
      errorMessages.push(error.toString());
    } else if (_.isObject(error) && (error.stack || _.get(error, 'stacktrace'))) {
      const stackFrames = ErrorStackParser.parse(error as Error);
      errorMessages.push(...stackFrames.map((stackFrame) => `${stackFrame.toString()}`));
    } else if (_.isObject(error)) {
      errorMessages.push(JSON.stringify(error, null, 2));
    } else if (_.isString(error)) {
      errorMessages.push(error);
    }

    return errorMessages;
  }

  public parseErrorToMessage(error: any) {
    return this.parseErrorToMessages(error).join('\n');
  }
}
