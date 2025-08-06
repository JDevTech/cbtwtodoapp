import { useCallback, useState } from 'react';
import { TaskEntity } from '../../domain/entities/task.entity';
import { CreateTaskEntity } from '@/domain/entities/create-task.entity';

import {
  createTaskUseCase,
  updateTaskUseCase,
  deleteTaskUseCase,
  getTaskByIdUseCase,
  getTasksByGroupIdUseCase,
} from '../../infrastructure/di/container';

export const useTasks = (groupId: string) => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState<TaskEntity[]>([]);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getTasksByGroupIdUseCase.execute(groupId);
      setTasks(result);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  }, [groupId]);

  const fetchTaskById = async (taskId: string) => {
    setLoading(true);
    try {
      const task = await getTaskByIdUseCase.execute(taskId);
      return task;
    } catch (error) {
      console.error('Error fetching task by ID:', error);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const createTask = async (task: CreateTaskEntity) => {
    setLoading(true);
    try {
      const newTask = await createTaskUseCase.execute(task);
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error('Error creating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateTask = async (id: string, task: Partial<TaskEntity>) => {
    setLoading(true);
    try {
      await updateTaskUseCase.execute(id, task);
      setTasks(prev => prev.map(t => (t.id === id ? { ...t, ...task } : t)));
    } catch (error) {
      console.error('Error updating task:', error);
    } finally {
      setLoading(false);
    }
  };

  const deleteTask = async (id: string) => {
    setLoading(true);
    try {
      await deleteTaskUseCase.execute(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Error deleting task:', error);
    } finally {
      setLoading(false);
    }
  };

  return {
    tasks,
    loading,
    createTask,
    updateTask,
    deleteTask,
    fetchTasks,
    fetchTaskById,
  };
};
