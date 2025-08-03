import { TaskEntity } from '../../../domain/entities/task.entity';
import { ITaskRepository } from '../../../domain/interfaces/task-repository.interface';

export class GetTaskByIdUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string): Promise<TaskEntity | null> {
    if (!taskId) {
      throw new Error('Task ID must be provided');
    }
    return await this.taskRepository.getTaskById(taskId);
  }
}
