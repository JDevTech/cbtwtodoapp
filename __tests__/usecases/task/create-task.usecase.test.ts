import { TaskEntity } from '../../../src/domain/entities/task.entity';
import { InMemoryTaskRepository } from '../../mocks/in-memory-task-repository';
import { CreateTaskUseCase } from '../../../src/app/usecases/task/create-task.usecase';

describe('CreateTaskUseCase', () => {
  it('should add a task to the repository', async () => {
    const tasksRepository = new InMemoryTaskRepository();
    const createTaskUseCase = new CreateTaskUseCase(tasksRepository);

    const task: TaskEntity = {
      id: '1',
      title: 'Test Task',
      groupId: 'group-1',
      completed: false,
    };

    await createTaskUseCase.execute(task);

    const tasks = await tasksRepository.getTasksByGroupId('group-1');
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe('Test Task');
  });
});
