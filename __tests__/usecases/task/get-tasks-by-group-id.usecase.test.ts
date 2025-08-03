import { GetTasksByGroupIdUseCase } from '../../../src/app/usecases/task/get-tasks-by-group-id.usecase';
import { TaskEntity } from '../../../src/domain/entities/task.entity';
import { InMemoryTaskRepository } from '../../mocks/in-memory-task-repository';

describe('GetTasksByGroupIdUseCase', () => {
  it('should return tasks for a specific group ID', async () => {
    const tasksRepository = new InMemoryTaskRepository();
    const getTasksByGroupIdUseCase = new GetTasksByGroupIdUseCase(
      tasksRepository,
    );

    const task1: TaskEntity = {
      id: '1',
      title: 'Test Task 1',
      groupId: 'group-1',
      completed: false,
    };

    const task2: TaskEntity = {
      id: '2',
      title: 'Test Task 2',
      groupId: 'group-1',
      completed: true,
    };

    await tasksRepository.createTask(task1);
    await tasksRepository.createTask(task2);

    const tasks = await getTasksByGroupIdUseCase.execute('group-1');
    expect(tasks).toHaveLength(2);
    expect(tasks[0].title).toBe('Test Task 1');
    expect(tasks[1].title).toBe('Test Task 2');
  });
});
