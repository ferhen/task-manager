import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { finalize } from 'rxjs/operators';

import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent {
    constructor(
        private readonly formBuilder: FormBuilder,
        private readonly authenticationService: AuthenticationService
    ) { }

    hidePassword = true;
    hideConfirmPassword = true;
    isSignUpMode = false;
    loading = false;

    loginForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    signUpForm = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
    }, { validators: this.checkPasswords });

    public signUp(): void {
        if (this.signUpForm.valid) {
            this.loading = true;
            const { username, password } = this.loginForm.value;

            this.authenticationService.signUp(username, password).pipe(
                finalize(() => this.loading = false)
            ).subscribe({
                error: err => {
                    console.log(err);
                    this.signUpForm.setErrors({ usernameInUse: true });
                },
                complete: () => localStorage.setItem('auth', 'Basic ' + btoa('username:password'))
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
                complete: () => localStorage.setItem('auth', 'Basic ' + btoa('username:password'))
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
