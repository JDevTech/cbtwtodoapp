import { TaskEntity } from '../entities/task.entity';
import { CreateTaskEntity } from '../entities/create-task.entity';

export interface ITaskRepository {
  deleteTask(id: string): Promise<void>;
  getTaskById(id: string): Promise<TaskEntity | null>;
  getTasksByGroupId(id: string): Promise<TaskEntity[]>;
  createTask(task: CreateTaskEntity): Promise<TaskEntity>;
  updateTask(id: string, task: Partial<TaskEntity>): Promise<void>;
}
