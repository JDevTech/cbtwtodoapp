import { TaskEntity } from './task.entity';

export type CreateTaskEntity = Omit<TaskEntity, 'id' | 'createdAt'>;
