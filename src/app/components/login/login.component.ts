import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

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
    loginInvalid = false;
    form = this.formBuilder.group({
        username: ['', Validators.required],
        password: ['', Validators.required]
    });
    loading = false;

    private signUp(username: string, password: string): void {
        this.authenticationService.signUp(username, password).subscribe({
            next: isAuthenticated => console.log(isAuthenticated),
            complete: () => this.loading = false
        });
    }

    private login(username: string, password: string): void {
        this.authenticationService.login(username, password).subscribe({
            next: isAuthenticated => console.log(isAuthenticated),
            complete: () => this.loading = false
        });
    }

    onSubmit(action: string): void {
        if (this.form.valid) {
            this.loading = true;
            const { username, password } = this.form.value;

            if (action === 'sign-up') {
                this.signUp(username, password);
            } else {
                this.login(username, password);
            }
        }
    }
}
