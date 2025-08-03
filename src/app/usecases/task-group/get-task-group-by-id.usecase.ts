import { TaskGroupEntity } from '../../../domain/entities/task-group.entity';
import { ITaskGroupRepository } from '../../../domain/interfaces/task-group-repository.interface';

export class GetTaskGroupByIdUseCase {
  constructor(private taskGroupRepository: ITaskGroupRepository) {}

  async execute(taskGroupId: string): Promise<TaskGroupEntity | null> {
    return await this.taskGroupRepository.getTaskGroupById(taskGroupId);
  }
}
