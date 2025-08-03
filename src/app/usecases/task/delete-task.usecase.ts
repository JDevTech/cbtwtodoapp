import { ITaskRepository } from '../../../domain/interfaces/task-repository.interface';

export class DeleteTaskUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(taskId: string): Promise<void> {
    if (!taskId) {
      throw new Error('Task ID must be provided');
    }
    await this.taskRepository.deleteTask(taskId);
  }
}
