import { TaskGroupEntity } from '../../src/domain/entities/task-group.entity';
import { ITaskGroupRepository } from '../../src/domain/interfaces/task-group-repository.interface';

export class InMemoryTaskGroupRepository implements ITaskGroupRepository {
  private groups: TaskGroupEntity[] = [];

  async getAllTaskGroups(): Promise<TaskGroupEntity[]> {
    return this.groups;
  }

  async deleteTaskGroup(groupId: string): Promise<void> {
    this.groups = this.groups.filter(group => group.id !== groupId);
  }

  async getTaskGroupById(id: string): Promise<TaskGroupEntity | null> {
    return this.groups.find(group => group.id === id) || null;
  }

  async createTaskGroup(group: TaskGroupEntity): Promise<TaskGroupEntity> {
    this.groups.push(group);
    return group;
  }

  async updateTaskGroup(
    id: string,
    taskGroup: Partial<TaskGroupEntity>,
  ): Promise<void> {
    const index = this.groups.findIndex(g => g.id === id);
    if (index !== -1) {
      this.groups[index] = { ...this.groups[index], ...taskGroup };
    }
  }
}
