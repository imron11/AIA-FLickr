import { Observable } from 'rxjs';
import LocalStorageService from '../local-storage/local-storage.service';

interface credentialInfo {
  email: string;
  password: string;
}

class AuthenticationStorageService {
  private storageKeyUser: string = 'User';
  private storageKeyAccessToken: string = 'AuthAccessToken';
  private storageKeyRefreshToken: string = 'AuthRefreshToken';
  private storageKeyCredential: string = 'CredentialInfo';
  private storageKeyEmail: string = 'Email';
  private storageKeyRole: string = 'Role';
  private storageKeyName: string = 'Name'

  private _user: any;
  private _accessToken: string;
  private _refreshToken: string;
  private _credentialInfo: credentialInfo;
  private _email: string;
  private _role: string;
  private _name: string;
  //   private _deviceId: string;

  public init() {
    return Observable.forkJoin(
      Observable.fromPromise(
        LocalStorageService.get(this.storageKeyAccessToken),
      ),
      Observable.fromPromise(
        LocalStorageService.get(this.storageKeyRefreshToken),
      ),
      Observable.fromPromise(
        LocalStorageService.get(this.storageKeyEmail),
      ),
      Observable.fromPromise(
        LocalStorageService.get(this.storageKeyRole),
      ),
      Observable.fromPromise(
        LocalStorageService.get(this.storageKeyName),
      ),
      Observable.fromPromise(LocalStorageService.get(this.storageKeyUser)),
      Observable.fromPromise(
        LocalStorageService.get(this.storageKeyCredential),
      )
    ).subscribe(
      ([
        accessToken,
        refreshToken,
        user,
        credentialInfo,
        email,
        role,
        name
      ]) => {
        this._accessToken = accessToken as any;
        this._refreshToken = refreshToken as any;
        this._user = user as any;
        this._credentialInfo = credentialInfo as credentialInfo;
        this._email = email as any;
        this._role = role as any;
        this._name = name as any;
        // this._deviceId = getUniqueId();
      },
    );
  }

  //#region User
  get user() {
    return this._user;
  }
  public setUser(user) {
    this._user = user;
    return Observable.fromPromise(
      LocalStorageService.save(this.storageKeyUser, user),
    );
  }
  public removeUser(): Observable<any> {
    this._user = undefined;
    return Observable.fromPromise(
      LocalStorageService.remove(this.storageKeyUser),
    );
  }
  //#endregion

  //#region accessToken
  get accessToken() {
    return this._accessToken;
  }
  public setAccessToken(accessToken: string): Observable<any> {
    this._accessToken = accessToken;
    return Observable.fromPromise(
      LocalStorageService.save(this.storageKeyAccessToken, accessToken),
    );
  }
  public removeAccessToken(): Observable<any> {
    this._accessToken = undefined;
    return Observable.fromPromise(
      LocalStorageService.remove(this.storageKeyAccessToken),
    );
  }
  //#endregion

  //#region email
  get email() {
    return this._email;
  }
  public setEmail(email: string): Observable<any> {
    this._email = email;
    return Observable.fromPromise(
      LocalStorageService.save(this.storageKeyEmail, email),
    );
  }
  public removeEmail(): Observable<any> {
    this._email = undefined;
    return Observable.fromPromise(
      LocalStorageService.remove(this.storageKeyEmail),
    );
  }
  //#endregion

  //#region role
  get role() {
    return this._role;
  }
  public setRole(role: string): Observable<any> {
    this._role = role;
    return Observable.fromPromise(
      LocalStorageService.save(this.storageKeyRole, role),
    );
  }
  public removeRole(): Observable<any> {
    this._role = undefined;
    return Observable.fromPromise(
      LocalStorageService.remove(this.storageKeyRole),
    );
  }
  //#endregion

  //#region role
  get name() {
    return this._name;
  }
  public setName(name: string): Observable<any> {
    this._name = name;
    return Observable.fromPromise(
      LocalStorageService.save(this.storageKeyName, name),
    );
  }
  public removeName(): Observable<any> {
    this._name = undefined;
    return Observable.fromPromise(
      LocalStorageService.remove(this.storageKeyName),
    );
  }
  //#endregion

  //#region refreshToken
  get refreshToken() {
    return this._refreshToken;
  }
  public setRefreshToken(refreshToken: string): Observable<any> {
    this._refreshToken = refreshToken;
    return Observable.fromPromise(
      LocalStorageService.save(this.storageKeyRefreshToken, refreshToken),
    );
  }
  public removeRefreshToken(): Observable<any> {
    this._refreshToken = undefined;
    return Observable.fromPromise(
      LocalStorageService.remove(this.storageKeyRefreshToken),
    );
  }
  //#endregion

  //#region Credential
  get credentialInfo(): credentialInfo {
    return this._credentialInfo;
  }
  public setCredential(credential: credentialInfo): Observable<credentialInfo> {
    this._credentialInfo = credential;
    return Observable.fromPromise(
      LocalStorageService.save(this.storageKeyCredential, credential),
    );
  }

  public removeCredential(): Observable<any> {
    return Observable.fromPromise(
      LocalStorageService.remove(this.storageKeyCredential),
    );
  }
  //#endregion

  public reset() {
    return Promise.all([
      this.removeAccessToken(),
      this.removeRefreshToken(),
      this.removeCredential(),
      this.removeUser(),
      this.removeEmail(),
      this.removeRole(),
      this.removeName()
    ]).then(() => { });
  }
}

export default AuthenticationStorageService;