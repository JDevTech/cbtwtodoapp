import { TaskEntity } from '../../../domain/entities/task.entity';
import { CreateTaskEntity } from '@/domain/entities/create-task.entity';
import { ITaskRepository } from '../../../domain/interfaces/task-repository.interface';

export class CreateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(task: CreateTaskEntity): Promise<TaskEntity> {
    if (!task) {
      throw new Error('Task must be provided');
    }
    return await this.taskRepository.createTask(task);
  }
}
