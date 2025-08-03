import { TaskEntity } from '../entities/task.entity';

export interface ITaskRepository {
  deleteTask(id: string): Promise<void>;
  createTask(task: TaskEntity): Promise<TaskEntity>;
  getTaskById(id: string): Promise<TaskEntity | null>;
  getTasksByGroupId(id: string): Promise<TaskEntity[]>;
  updateTask(id: string, task: Partial<TaskEntity>): Promise<void>;
}
