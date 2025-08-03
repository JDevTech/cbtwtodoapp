import { TaskEntity } from '../../../domain/entities/task.entity';
import { ITaskRepository } from '../../../domain/interfaces/task-repository.interface';

export class GetTasksByGroupIdUseCase {
  constructor(private taskRepository: ITaskRepository) {}

  async execute(groupId: string): Promise<TaskEntity[]> {
    if (!groupId) {
      throw new Error('Group ID must be provided');
    }
    return await this.taskRepository.getTasksByGroupId(groupId);
  }
}
