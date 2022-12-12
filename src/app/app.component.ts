import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { InputBoxComponent } from 'components/input-box/input-box.component';
import { TaskListComponent } from 'components/task-list/task-list.component';
import { IInputBoxForm } from 'interfaces/input-box-form';
import { IStatusChange } from 'interfaces/status-change';
import { ITask } from 'interfaces/task';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [InputBoxComponent, TaskListComponent, MatToolbarModule],
  template: `
    <div class="container">
      <mat-toolbar class="heading">
        <span>Todo list</span>
      </mat-toolbar>
      <app-input-box (send)="onSubmit($event)"></app-input-box>
      <app-task-list
        [tasks]="tasks"
        (checkboxChange)="onCheckBoxChange($event)"
      ></app-task-list>
    </div>
  `,
  styles: [
    `
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 0 20px;
      }
    `,
  ],
})
export class AppComponent {
  tasks: ITask[] = [];

  onSubmit({ title, description }: IInputBoxForm): void {
    const task: ITask = {
      id: Math.round(Math.random() * 1e5),
      title,
      description,
      timestamp: new Date(),
      isDone: false,
    };

    this.tasks.push(task);
  }

  onCheckBoxChange({ checked, task: { id, ...rest } }: IStatusChange): void {
    const filterAllTasks = this.tasks.filter(
      ({ id: current }) => current !== id,
    );

    this.tasks = [
      ...filterAllTasks,
      {
        id,
        ...rest,
        isDone: checked,
      },
    ];
  }
}
