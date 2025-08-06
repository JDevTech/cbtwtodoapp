import { TaskGroupEntity } from './task-group.entity';

export type CreateTaskGroupEntity = Omit<TaskGroupEntity, 'id' | 'createdAt'>;
