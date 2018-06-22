import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response, ResponseContentType } from '@angular/http';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { environment } from '../environments/environment';
import { PhoneBookDT, PhoneTypeDT } from '../models/phonebook.model';

@Injectable()
export class PhoneBookService {
    private phoneBookServiceURL: string = environment.Service_URL;

    constructor(protected http: Http, private httpclient: HttpClient) { }

    getAllContact(): Observable<PhoneBookDT[]> {
        let url = this.phoneBookServiceURL + "users/getAllContact";
        // let header = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.httpclient.get<PhoneBookDT[]>(url)
            .catch(this.handleError);

        // return this.getHelper(url);
    }

    getAllPhoneType(): Observable<PhoneTypeDT[]> {
        let url = this.phoneBookServiceURL + "users/getAllPhoneType";

        return this.httpclient.get<PhoneTypeDT[]>(url)
            .catch(this.handleError);

        // return this.getHelper(url);
    }

    getContactByFirstName(firstName: string): Observable<PhoneBookDT> {
        let url = this.phoneBookServiceURL + "users/getContactByFirstName?firstName=" + firstName;

        return this.httpclient.get<PhoneBookDT>(url)
            .catch(this.handleError);
        // return this.getHelper(url);
    }

    getContactByLastName(lastName: string): Observable<PhoneBookDT> {
        let url = this.phoneBookServiceURL + "users/getContactByLastName?lastName=" + lastName;

        return this.httpclient.get<PhoneBookDT>(url)
            .catch(this.handleError);
        // return this.getHelper(url);
    }

    getContactByNumber(number: string): Observable<PhoneBookDT> {
        let url = this.phoneBookServiceURL + "users/getContactByNumber?number=" + number;

        return this.httpclient.get<PhoneBookDT>(url)
            .catch(this.handleError);
        // return this.getHelper(url);
    }

    insertContact(model: any): Observable<HttpResponse<Object>> {
        let url = this.phoneBookServiceURL + "users/createContact";

        return this.postHelper(url, model);
    }

    postHelper(url: string, model: any) {
        // let header = new HttpHeaders({ 'Content-Type': 'application/json', 'X-WMS-Token': sessionStorage["token"] });
        let header = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.httpclient.post(url, model, {
            headers: header,
            observe: 'response'
        }).catch(this.handleError);
    }

    getHelper(url: string) {
        // let header = new HttpHeaders({ 'Content-Type': 'application/json', 'X-WMS-Token': sessionStorage["token"] });
        let header = new HttpHeaders({ 'Content-Type': 'application/json' });

        return this.httpclient.get(url, {
            headers: header,
            observe: 'response'
        }).catch(this.handleError);
    }

    private handleError(error: Response | any): Observable<any> {
        // In a real world app, we might use a remote logging infrastructure
        if (error instanceof Response) {
            return Observable.throw(error);
        } else {
            let errMsg: string;
            errMsg = error.message ? error.message : error.toString();
            return Observable.throw(errMsg);
        }
    }
}