import { TaskGroupEntity } from '../../../src/domain/entities/task-group.entity';
import { InMemoryTaskGroupRepository } from '../../mocks/in-memory-task-group-repository';
import { CreateTaskGroupUseCase } from '../../../src/app/usecases/task-group/create-task-group.usecase';

describe('CreateTaskGroupUseCase', () => {
  it('should create a new task group', async () => {
    const tasksRepository = new InMemoryTaskGroupRepository();
    const createTaskGroupUseCase = new CreateTaskGroupUseCase(tasksRepository);

    const taskGroup: TaskGroupEntity = {
      id: 'group-1',
      title: 'Test Group',
      createdAt: new Date(),
    };

    await createTaskGroupUseCase.execute(taskGroup);

    const foundGroup = await tasksRepository.getTaskGroupById('group-1');
    expect(foundGroup).toBeDefined();
    expect(foundGroup?.title).toBe('Test Group');
  });
});
