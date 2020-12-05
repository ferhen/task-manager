import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor() { }

    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        request = request.clone({
            headers: request.headers.append('Content-Type', 'application/json')
        });

        const authentication = localStorage.getItem('auth');
        if (authentication) {
            request = request.clone({
                headers: request.headers.append('Authorization', authentication)
            });
        }

        return next.handle(request);
    }
}
