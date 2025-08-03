import { ITaskGroupRepository } from '../../../domain/interfaces/task-group-repository.interface';

export class DeleteTaskGroupUseCase {
  constructor(private taskGroupRepository: ITaskGroupRepository) {}

  async execute(taskGroupId: string): Promise<void> {
    return await this.taskGroupRepository.deleteTaskGroup(taskGroupId);
  }
}
