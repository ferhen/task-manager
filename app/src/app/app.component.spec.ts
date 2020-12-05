import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

import { AppComponent } from './app.component';
import { BackgroundComponent } from './components/background/background.component';
import { LoginComponent } from './components/login/login.component';
import { TaskDialogComponent } from './components/task-dialog/task-dialog.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        FormsModule,
        BrowserModule,
        FormsModule,
        ReactiveFormsModule
      ],
      declarations: [
        AppComponent,
        LoginComponent,
        ToolbarComponent,
        BackgroundComponent,
        TasksComponent,
        TaskDialogComponent
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'task-manager'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.componentInstance;
  //   expect(app.title).toEqual('task-manager');
  // });

  // it('should render title', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.nativeElement;
  //   expect(compiled.querySelector('.content span').textContent).toContain('task-manager app is running!');
  // });
});
