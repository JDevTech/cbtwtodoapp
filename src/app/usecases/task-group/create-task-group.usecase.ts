import { TaskGroupEntity } from '../../../domain/entities/task-group.entity';
import { ITaskGroupRepository } from '../../../domain/interfaces/task-group-repository.interface';

export class CreateTaskGroupUseCase {
  constructor(private taskGroupRepository: ITaskGroupRepository) {}

  async execute(taskGroupData: TaskGroupEntity): Promise<TaskGroupEntity> {
    return await this.taskGroupRepository.createTaskGroup(taskGroupData);
  }
}
