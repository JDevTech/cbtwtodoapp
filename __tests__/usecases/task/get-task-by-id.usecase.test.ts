import { TaskEntity } from '../../../src/domain/entities/task.entity';
import { InMemoryTaskRepository } from '../../mocks/in-memory-task-repository';
import { GetTaskByIdUseCase } from '../../../src/app/usecases/task/get-task-by-id.usecase';

describe('GetTaskByIdUseCase', () => {
  it('should return a task by its ID', async () => {
    const tasksRepository = new InMemoryTaskRepository();
    const getTaskByIdUseCase = new GetTaskByIdUseCase(tasksRepository);

    const task: TaskEntity = {
      id: '1',
      title: 'Test Task',
      groupId: 'group-1',
      completed: false,
    };

    await tasksRepository.createTask(task);

    const foundTask = await getTaskByIdUseCase.execute('1');
    expect(foundTask).toBeDefined();
    expect(foundTask?.title).toBe('Test Task');
  });
});
