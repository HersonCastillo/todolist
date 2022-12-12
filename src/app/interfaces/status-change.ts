import { ITask } from './task';

export interface IStatusChange {
  checked: boolean;
  task: ITask;
}
