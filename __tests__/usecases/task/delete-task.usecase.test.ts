import { DeleteTaskUseCase } from '../../../src/app/usecases/task/delete-task.usecase';
import { TaskEntity } from '../../../src/domain/entities/task.entity';
import { InMemoryTaskRepository } from '../../mocks/in-memory-task-repository';

describe('DeleteTaskUseCase', () => {
  it('should remove a task from the repository', async () => {
    const tasksRepository = new InMemoryTaskRepository();
    const deleteTaskUseCase = new DeleteTaskUseCase(tasksRepository);

    const task: TaskEntity = {
      id: '1',
      title: 'Test Task',
      groupId: 'group-1',
      completed: false,
    };

    await tasksRepository.createTask(task);
    await deleteTaskUseCase.execute('1');

    const tasks = await tasksRepository.getTasksByGroupId('group-1');
    expect(tasks).toHaveLength(0);
  });
});
