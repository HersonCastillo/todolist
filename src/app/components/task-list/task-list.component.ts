import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ITask } from 'interfaces/task';
import { TaskListContainerComponent } from 'components/task-list-container/task-list-container.component';
import { IStatusChange } from 'interfaces/status-change';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskListContainerComponent],
  templateUrl: './task-list.component.html',
})
export class TaskListComponent {
  @Input() tasks: ITask[] = [];
  @Output() checkboxChange = new EventEmitter<IStatusChange>();

  get filterByUnresolved(): ITask[] {
    if (this.tasks.length > 0) {
      return this.tasks
        .filter(({ isDone }) => !isDone)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }

    return [];
  }

  get filterByResolved(): ITask[] {
    if (this.tasks.length > 0) {
      return this.tasks
        .filter(({ isDone }) => isDone)
        .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
    }

    return [];
  }

  onCheckBoxChange(status: IStatusChange): void {
    this.checkboxChange.emit(status);
  }
}
