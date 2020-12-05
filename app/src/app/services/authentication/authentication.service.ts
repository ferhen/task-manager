import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthenticationService {
    constructor(
        private readonly http: HttpClient,
        private readonly router: Router
    ) {
        this.isAuthenticated$.subscribe(isAuthenticated => {
            if (isAuthenticated) {
                this.router.navigateByUrl('/tasks');
            } else {
                this.router.navigateByUrl('/');
            }
        });
        this.loginFromSession();
    }

    private readonly AUTH_KEY = 'auth';

    public isAuthenticated$ = new Subject<boolean>();

    public signUp(username: string, password: string): Observable<any> {
        return this.http.post(
            `${environment.apiUrl}/signup`,
            { username, password }
        );
    }

    public login(username: string, password: string): Observable<any> {
        return this.http.post(
            `${environment.apiUrl}/login`,
            { username, password }
        );
    }

    public logout(): void {
        localStorage.removeItem(this.AUTH_KEY);
        this.isAuthenticated$.next(false);
    }

    public storeAuthentication(username: string, password: string): void {
        localStorage.setItem(this.AUTH_KEY, 'Basic ' + btoa(`${username}:${password}`));
        this.isAuthenticated$.next(true);
    }

    public isAuthenticated(): Observable<boolean> {
        return this.isAuthenticated$;
    }

    private loginFromSession(): void {
        const authentication = localStorage.getItem(this.AUTH_KEY);
        if (!authentication) {
            return;
        }

        const [username, password] = atob(authentication.slice(6)).split(':');
        this.login(username, password).subscribe(isAuthenticated => {
            this.isAuthenticated$.next(isAuthenticated);
        });
    }
}
