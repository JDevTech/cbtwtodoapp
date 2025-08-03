import AsyncStorage from '@react-native-async-storage/async-storage';
import { TaskGroupEntity } from '../../../domain/entities/task-group.entity';
import { ITaskGroupRepository } from '../../../domain/interfaces/task-group-repository.interface';

const GROUP_STORAGE_KEY = 'TASK_GROUPS';

export class AsyncTaskGroupRepository implements ITaskGroupRepository {
  async getAllTaskGroups(): Promise<TaskGroupEntity[]> {
    const groupsJson = await AsyncStorage.getItem(GROUP_STORAGE_KEY);
    return groupsJson ? JSON.parse(groupsJson) : [];
  }

  async deleteTaskGroup(groupId: string): Promise<void> {
    const groups = await this.getAllTaskGroups();
    const updatedGroups = groups.filter(group => group.id !== groupId);
    await AsyncStorage.setItem(
      GROUP_STORAGE_KEY,
      JSON.stringify(updatedGroups),
    );
  }

  async createTaskGroup(group: TaskGroupEntity): Promise<TaskGroupEntity> {
    const groups = await this.getAllTaskGroups();
    groups.push(group);
    await AsyncStorage.setItem(GROUP_STORAGE_KEY, JSON.stringify(groups));
    return group;
  }

  async getTaskGroupById(id: string): Promise<TaskGroupEntity | null> {
    const groups = await this.getAllTaskGroups();
    return groups.find(group => group.id === id) || null;
  }

  async updateTaskGroup(
    id: string,
    taskGroup: Partial<TaskGroupEntity>,
  ): Promise<void> {
    const groups = await this.getAllTaskGroups();
    const groupIndex = groups.findIndex(g => g.id === id);
    if (groupIndex !== -1) {
      groups[groupIndex] = { ...groups[groupIndex], ...taskGroup };
      await AsyncStorage.setItem(GROUP_STORAGE_KEY, JSON.stringify(groups));
    }
  }
}
