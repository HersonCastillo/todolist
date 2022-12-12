export interface ITask {
  id: number;
  title: string;
  description: string | null;
  isDone: boolean;
  timestamp: Date;
}
