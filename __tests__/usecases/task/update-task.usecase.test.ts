import { UpdateTaskUseCase } from '../../../src/app/usecases/task/update-task.usecase';
import { TaskEntity } from '../../../src/domain/entities/task.entity';
import { InMemoryTaskRepository } from '../../mocks/in-memory-task-repository';

describe('UpdateTaskUseCase', () => {
  it('should update a task in the repository', async () => {
    const tasksRepository = new InMemoryTaskRepository();
    const updateTaskUseCase = new UpdateTaskUseCase(tasksRepository);

    const task: TaskEntity = {
      id: '1',
      title: 'Test Task',
      groupId: 'group-1',
      completed: false,
    };

    await tasksRepository.createTask(task);

    const updatedTask: Partial<TaskEntity> = {
      title: 'Updated Task',
      completed: true,
    };

    await updateTaskUseCase.execute('1', updatedTask);

    const foundTask = await tasksRepository.getTaskById('1');
    expect(foundTask).toBeDefined();
    expect(foundTask?.title).toBe('Updated Task');
    expect(foundTask?.completed).toBe(true);
  });
});
