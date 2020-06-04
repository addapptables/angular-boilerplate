import { Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ConfigurationModel, CONFIGURATION_BOILERPLATE } from '@craftsjs/boilerplate';
import { removeEmptyOrNil } from '../../../../utils/utils';

export class ServiceApiBase {

    protected _http: HttpClient;
    protected _configuration: ConfigurationModel;
    protected _url: string;

    constructor(protected injector: Injector, apiUrl: string) {
        this._http = injector.get(HttpClient);
        this._configuration = injector.get(CONFIGURATION_BOILERPLATE);
        this._url = `${this._configuration.remoteServiceBaseUrl}/${apiUrl}`;
    }

    protected post<T>(url: string): Observable<T>;
    protected post<T, R>(url: string, params: T): Observable<R>;
    protected post<T, R>(url: string, params?: T): Observable<R> {
        const urlSend = this._url + '/' + url;
        return this._http.post<R>(urlSend, params);
    }

    protected put<T>(url: string): Observable<T>;
    protected put<T, R>(url: string, params: T): Observable<R>;
    protected put<T, R>(url: string, params?: T): Observable<R> {
        const urlSend = this._url + '/' + url;
        return this._http.put<R>(urlSend, params);
    }

    protected get<T>(url: string): Observable<T>;
    protected get<T, R>(url: string, params: T): Observable<R>;
    protected get<T, R>(url: string, params?: T): Observable<R> {
        const urlSend = this._url + '/' + url;
        let paramsSend;
        if (params) { paramsSend = removeEmptyOrNil(params); }
        return this._http.get<R>(urlSend, { params: paramsSend });
    }

    protected delete(id: string) {
        const urlSend = this._url + '/' + id;
        return this._http.delete<any>(urlSend);
    }
}
