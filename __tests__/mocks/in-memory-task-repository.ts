import { TaskEntity } from '../../src/domain/entities/task.entity';
import { ITaskRepository } from '../../src/domain/interfaces/task-repository.interface';

export class InMemoryTaskRepository implements ITaskRepository {
  private tasks: TaskEntity[] = [];

  async deleteTask(id: string): Promise<void> {
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  async createTask(task: TaskEntity): Promise<TaskEntity> {
    this.tasks.push(task);
    return task;
  }

  async getTaskById(id: string): Promise<TaskEntity | null> {
    return this.tasks.find(task => task.id === id) || null;
  }

  async getTasksByGroupId(groupId: string): Promise<TaskEntity[]> {
    return this.tasks.filter(task => task.groupId === groupId);
  }

  async updateTask(id: string, task: Partial<TaskEntity>): Promise<void> {
    const index = this.tasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.tasks[index] = { ...this.tasks[index], ...task };
    }
  }
}
