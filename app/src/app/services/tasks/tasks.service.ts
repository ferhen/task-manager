import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ITask } from 'src/app/models/task.model';

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    constructor(private readonly http: HttpClient) { }

    public listTasks(): Observable<ITask[]> {
        return this.http.get<ITask[]>(`${environment.apiUrl}/tasks`);
    }
}
