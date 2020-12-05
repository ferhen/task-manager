import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(private readonly http: HttpClient) { }

    signUp(username: string, password: string): Observable<any> {
        return this.http.post(
            `${environment.apiUrl}/signup`,
            { username, password }
        );
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(
            `${environment.apiUrl}/login`,
            { username, password }
        );
    }
}
