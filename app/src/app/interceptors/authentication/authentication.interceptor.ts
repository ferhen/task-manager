import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(private readonly router: Router) { }

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

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.router.navigateByUrl('/');
                }
                return throwError(error);
            })
        );
    }
}
