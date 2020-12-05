import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { ITask } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks/tasks.service';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
    constructor(private readonly tasksService: TasksService) { }

    public tasks$ = new Observable<ITask[]>();

    ngOnInit(): void {
        this.tasks$ = this.tasksService.listTasks();
    }
}
