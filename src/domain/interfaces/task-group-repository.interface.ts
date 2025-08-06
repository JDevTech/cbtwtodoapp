import { TaskGroupEntity } from '../entities/task-group.entity';
import { CreateTaskGroupEntity } from '../entities/create-task-group.entity';

export interface ITaskGroupRepository {
  deleteTaskGroup(id: string): Promise<void>;
  getAllTaskGroups(): Promise<TaskGroupEntity[]>;
  getTaskGroupById(id: string): Promise<TaskGroupEntity | null>;
  createTaskGroup(group: CreateTaskGroupEntity): Promise<TaskGroupEntity>;
  updateTaskGroup(id: string, group: Partial<TaskGroupEntity>): Promise<void>;
}
