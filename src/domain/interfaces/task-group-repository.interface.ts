import { TaskGroupEntity } from '../entities/task-group.entity';

export interface ITaskGroupRepository {
  deleteTaskGroup(id: string): Promise<void>;
  getAllTaskGroups(): Promise<TaskGroupEntity[]>;
  getTaskGroupById(id: string): Promise<TaskGroupEntity | null>;
  createTaskGroup(group: TaskGroupEntity): Promise<TaskGroupEntity>;
  updateTaskGroup(id: string, group: Partial<TaskGroupEntity>): Promise<void>;
}
