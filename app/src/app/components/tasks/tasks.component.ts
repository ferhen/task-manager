import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { ITask } from 'src/app/models/task.model';
import { TasksService } from 'src/app/services/tasks/tasks.service';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

@Component({
    selector: 'app-tasks',
    templateUrl: './tasks.component.html',
    styleUrls: ['./tasks.component.scss']
})
export class TasksComponent implements OnInit {
    constructor(
        private readonly tasksService: TasksService,
        private readonly dialog: MatDialog
    ) { }

    private allTasks$ = new BehaviorSubject<ITask[]>([]);
    public tasks$ = new Observable<ITask[]>();
    public filter$ = new BehaviorSubject('');

    public addTask(): void {
        const dialogRef = this.dialog.open(TaskDialogComponent, {
            width: '300px'
        });

        dialogRef.afterClosed().subscribe(newTask => {
            if (!newTask) {
                return;
            }
            this.tasksService.addTask(newTask).subscribe(task => {
                this.allTasks$.next([
                    task,
                    ...this.allTasks$.getValue()
                ]);
            });
        });
    }

    public editTask(task: ITask): void {
        const { _id, ...taskDetails } = task;
        const dialogRef = this.dialog.open(TaskDialogComponent, {
            width: '300px',
            data: taskDetails
        });

        dialogRef.afterClosed().subscribe(editedTask => {
            if (!editedTask) {
                return;
            }
            this.tasksService.editTask({ _id, ...editedTask }).subscribe(updatedTask => {
                const currentAllTasks = this.allTasks$.getValue();
                const updatedTaskIndex = currentAllTasks.findIndex(t => t._id === updatedTask._id);
                currentAllTasks[updatedTaskIndex] = updatedTask;
                this.allTasks$.next(currentAllTasks);
            });
        });
    }

    public deleteTask(taskId: string): void {
        this.tasksService.deleteTask(taskId).subscribe(deletedTaskId => {
            this.allTasks$.next(
                this.allTasks$.getValue().filter(task => task._id !== deletedTaskId)
            );
        });
    }

    ngOnInit(): void {
        this.tasksService.listTasks().subscribe(tasks => {
            this.allTasks$.next(tasks);
        });

        this.tasks$ = combineLatest([this.allTasks$, this.filter$]).pipe(
            map(([allTasks, filter]) => allTasks.filter(tasks => tasks.title.toLowerCase().includes(filter.toLowerCase())))
        );
    }
}
