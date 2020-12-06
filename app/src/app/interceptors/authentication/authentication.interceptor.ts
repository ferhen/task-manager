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
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {
    constructor(
        private readonly router: Router,
        private readonly snackBar: MatSnackBar
    ) { }

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
                } else {
                    let errorMessage = '';
                    if (error.status === 0) {
                        errorMessage = 'Could not connect to server';
                    } else {
                        errorMessage = error.message;
                    }
                    this.snackBar.open(errorMessage, 'Close', {
                        duration: 10000,
                        panelClass: ['mat-warn']
                    });
                }
                return throwError(error);
            })
        );
    }
}
