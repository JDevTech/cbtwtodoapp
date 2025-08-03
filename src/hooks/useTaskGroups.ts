import { useState } from 'react';
import {
  createTaskGroupUseCase,
  updateTaskGroupUseCase,
  deleteTaskGroupUseCase,
  getAllTaskGroupsUseCase,
  getTaskGroupByIdUseCase,
} from '../di/container';
import { TaskGroupEntity } from '../domain/entities/task-group.entity';

export const useTaskGroups = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [groups, setGroups] = useState<TaskGroupEntity[]>([]);

  const fetchTaskGroups = async () => {
    setLoading(true);
    try {
      const result = await getAllTaskGroupsUseCase.execute();
      setGroups(result);
    } catch (error) {
      console.error('Error fetching task groups:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTaskGroupById = async (id: string) => {
    setLoading(true);
    try {
      const group = await getTaskGroupByIdUseCase.execute(id);
      return group;
    } catch (error) {
      console.error('Error fetching task group by ID:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createTaskGroup = async (taskGroup: TaskGroupEntity) => {
    setLoading(true);
    try {
      const newGroup = await createTaskGroupUseCase.execute(taskGroup);
      setGroups(prev => [...prev, newGroup]);
    } catch (error) {
      console.error('Error creating task group:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTaskGroup = async (
    groupId: string,
    taskGroup: TaskGroupEntity,
  ) => {
    setLoading(true);
    try {
      await updateTaskGroupUseCase.execute(groupId, taskGroup);
      setGroups(prev => prev.map(g => (g.id === groupId ? taskGroup : g)));
    } catch (error) {
      console.error('Error updating task group:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTaskGroup = async (groupId: string) => {
    setLoading(true);
    try {
      await deleteTaskGroupUseCase.execute(groupId);
      setGroups(prev => prev.filter(g => g.id !== groupId));
    } catch (error) {
      console.error('Error deleting task group:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    groups,
    loading,
    createTaskGroup,
    updateTaskGroup,
    deleteTaskGroup,
    fetchTaskGroups,
    fetchTaskGroupById,
  };
};
