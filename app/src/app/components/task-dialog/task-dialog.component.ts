import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { ITask } from 'src/app/models/task.model';

@Component({
    selector: 'app-task-dialog',
    templateUrl: './task-dialog.component.html',
    styleUrls: ['./task-dialog.component.scss']
})
export class TaskDialogComponent implements OnInit {
    constructor(
        public dialogRef: MatDialogRef<TaskDialogComponent>,
        private readonly formBuilder: FormBuilder,
        @Inject(MAT_DIALOG_DATA) public task: ITask
    ) { }

    public isEdit = false;

    public form = this.formBuilder.group({
        title: ['', Validators.required],
        date: [new Date(), Validators.required],
        description: ['']
    });

    ngOnInit(): void {
        if (this.task) {
            this.isEdit = true;
            this.form.setValue(this.task);
        }
    }
}
