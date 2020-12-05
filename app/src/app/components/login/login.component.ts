import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(
        private readonly authenticationService: AuthenticationService,
        private readonly formBuilder: FormBuilder,
        private readonly snackBar: MatSnackBar
    ) { }

    public hidePassword = true;
    public hideConfirmPassword = true;
    public isSignUpMode = false;
    public loading = false;

    public loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    public signUpForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
    }, { validators: this.checkPasswords });

    public signUp(): void {
        if (this.signUpForm.valid) {
            this.loading = true;
            const { username, password } = this.signUpForm.value;

            this.authenticationService.signUp(username, password).pipe(
                finalize(() => this.loading = false)
            ).subscribe({
                error: err => {
                    if (err?.error?.code === 'usernameInUse') {
                        this.signUpForm.setErrors({ usernameInUse: true });
                    } else {
                        this.signUpForm.setErrors({ signUpError: true });
                    }
                },
                complete: () => {
                    this.snackBar.open('Sign up successful!', 'Close', {
                        duration: 10000,
                    });
                    this.isSignUpMode = false;
                }
            });
        }
    }

    public login(): void {
        if (this.loginForm.valid) {
            this.loading = true;
            const { username, password } = this.loginForm.value;

            this.authenticationService.login(username, password).pipe(
                finalize(() => this.loading = false)
            ).subscribe({
                error: err => {
                    if (err.status === 401) {
                        this.loginForm.setErrors({ unauthorized: true });
                    } else {
                        this.loginForm.setErrors({ loginError: true });
                    }
                },
                complete: () => {
                    this.authenticationService.storeAuthentication(username, password);
                }
            });
        }
    }

    public toSignUpMode(): void {
        this.resetForms();
        this.isSignUpMode = true;
    }

    public toLoginMode(): void {
        this.resetForms();
        this.isSignUpMode = false;
    }

    private resetForms(): void {
        this.loginForm.reset();
        this.signUpForm.reset();
    }

    private checkPasswords(group: FormGroup): Validators | null {
        const { password, confirmPassword } = group.value;
        return password === confirmPassword ? null : { notSame: true };
    }
}
