import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import {
  MatCheckboxChange,
  MatCheckboxModule,
} from '@angular/material/checkbox';
import { ITask } from 'interfaces/task';
import { IStatusChange } from 'interfaces/status-change';

@Component({
  selector: 'app-task-list-container',
  standalone: true,
  imports: [CommonModule, MatListModule, MatIconModule, MatCheckboxModule],
  templateUrl: './task-list-container.component.html',
  styleUrls: ['./task-list-container.component.scss'],
})
export class TaskListContainerComponent {
  @Input() title!: string;
  @Input() list!: ITask[];
  @Output() checkboxChange = new EventEmitter<IStatusChange>();

  onCheckBoxChange({ checked }: MatCheckboxChange, task: ITask): void {
    this.checkboxChange.emit({ checked, task });
  }
}
