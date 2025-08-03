import { GetTaskGroupByIdUseCase } from '../../../src/app/usecases/task-group/get-task-group-by-id.usecase';
import { TaskGroupEntity } from '../../../src/domain/entities/task-group.entity';
import { InMemoryTaskGroupRepository } from '../../mocks/in-memory-task-group-repository';

describe('GetTaskGroupByIdUseCase', () => {
  it('should return a task group by id', async () => {
    const tasksRepository = new InMemoryTaskGroupRepository();
    const getTaskGroupByIdUseCase = new GetTaskGroupByIdUseCase(
      tasksRepository,
    );

    const taskGroup: TaskGroupEntity = {
      id: 'group-1',
      title: 'Test Group',
      createdAt: new Date(),
    };

    await tasksRepository.createTaskGroup(taskGroup);

    const result = await getTaskGroupByIdUseCase.execute('group-1');

    expect(result).toBeDefined();
    expect(result?.id).toBe('group-1');
  });
});
