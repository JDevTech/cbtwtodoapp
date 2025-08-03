import { TaskGroupEntity } from '../../../domain/entities/task-group.entity';
import { ITaskGroupRepository } from '../../../domain/interfaces/task-group-repository.interface';

export class UpdateTaskGroupUseCase {
  constructor(private taskGroupRepository: ITaskGroupRepository) {}

  async execute(
    id: string,
    taskGroup: Partial<TaskGroupEntity>,
  ): Promise<void> {
    return await this.taskGroupRepository.updateTaskGroup(id, taskGroup);
  }
}
