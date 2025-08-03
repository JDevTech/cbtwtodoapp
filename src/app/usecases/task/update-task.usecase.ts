import { TaskEntity } from '../../../domain/entities/task.entity';
import { ITaskRepository } from '../../../domain/interfaces/task-repository.interface';

export class UpdateTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(id: string, task: Partial<TaskEntity>): Promise<void> {
    if (!id || !task) {
      throw new Error('Task ID and task details must be provided');
    }
    await this.taskRepository.updateTask(id, task);
  }
}
