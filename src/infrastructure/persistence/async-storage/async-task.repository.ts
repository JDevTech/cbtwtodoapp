import uuid from 'react-native-uuid';
import { TaskEntity } from '../../../domain/entities/task.entity';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CreateTaskEntity } from '@/domain/entities/create-task.entity';
import { ITaskRepository } from '../../../domain/interfaces/task-repository.interface';

const TASK_STORAGE_KEY = 'TASKS';

export class AsyncTaskRepository implements ITaskRepository {
  async deleteTask(id: string): Promise<void> {
    const tasks = await this.getAllTasks();
    const updatedTasks = tasks.filter(task => task.id !== id);
    await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(updatedTasks));
  }

  async getTaskById(id: string): Promise<TaskEntity | null> {
    const tasks = await this.getAllTasks();
    return tasks.find(task => task.id === id) || null;
  }

  async getTasksByGroupId(id: string): Promise<TaskEntity[]> {
    const tasks = await this.getAllTasks();
    return tasks.filter(task => task.groupId === id);
  }

  async updateTask(id: string, task: Partial<TaskEntity>): Promise<void> {
    const tasks = await this.getAllTasks();
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex !== -1) {
      tasks[taskIndex] = { ...tasks[taskIndex], ...task };
      await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
    }
  }

  async createTask(task: CreateTaskEntity): Promise<TaskEntity> {
    const tasks = await this.getAllTasks();
    const newTask: TaskEntity = {
      id: uuid.v4(),
      createdAt: new Date(),
      ...task,
    };
    tasks.push(newTask);
    await AsyncStorage.setItem(TASK_STORAGE_KEY, JSON.stringify(tasks));
    return newTask;
  }

  private async getAllTasks(): Promise<TaskEntity[]> {
    const tasksJson = await AsyncStorage.getItem(TASK_STORAGE_KEY);
    return tasksJson ? JSON.parse(tasksJson) : [];
  }
}
