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

    public addTask(task: ITask): Observable<ITask> {
        return this.http.post<ITask>(`${environment.apiUrl}/tasks`, task);
    }

    public editTask(task: ITask): Observable<ITask> {
        return this.http.put<ITask>(`${environment.apiUrl}/tasks`, task);
    }

    public deleteTask(taskId: string): Observable<string> {
        return this.http.delete<string>(
            `${environment.apiUrl}/tasks/${taskId}`,
            { responseType: 'text' as 'json'}
        );
    }
}
