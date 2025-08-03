import { TaskGroupEntity } from '../../../domain/entities/task-group.entity';
import { ITaskGroupRepository } from '../../../domain/interfaces/task-group-repository.interface';

export class GetAllTaskGroupsUseCase {
  constructor(private taskGroupRepository: ITaskGroupRepository) {}

  async execute(): Promise<TaskGroupEntity[]> {
    return await this.taskGroupRepository.getAllTaskGroups();
  }
}
