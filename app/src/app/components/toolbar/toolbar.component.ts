import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
    selector: 'app-toolbar',
    templateUrl: './toolbar.component.html',
    styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
    constructor(private readonly authenticationService: AuthenticationService) { }

    public isAuthenticated = false;

    public logout(): void {
        this.authenticationService.logout();
    }

    ngOnInit(): void {
        this.authenticationService.isAuthenticated().subscribe(isAuthenticated => {
            this.isAuthenticated = isAuthenticated;
        });
    }
}
