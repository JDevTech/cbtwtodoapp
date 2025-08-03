import { UpdateTaskGroupUseCase } from '../../../src/app/usecases/task-group/update-task-group.usecase';
import { TaskGroupEntity } from '../../../src/domain/entities/task-group.entity';
import { InMemoryTaskGroupRepository } from '../../mocks/in-memory-task-group-repository';

describe('UpdateTaskGroupUseCase', () => {
  it('should update a task group', async () => {
    const tasksRepository = new InMemoryTaskGroupRepository();
    const updateTaskGroupUseCase = new UpdateTaskGroupUseCase(tasksRepository);

    const taskGroup: TaskGroupEntity = {
      id: 'group-1',
      title: 'Test Group',
      createdAt: new Date(),
    };

    await tasksRepository.createTaskGroup(taskGroup);

    const updatedData: Partial<TaskGroupEntity> = {
      title: 'Updated Test Group',
    };

    await updateTaskGroupUseCase.execute('group-1', updatedData);

    const foundGroup = await tasksRepository.getTaskGroupById('group-1');
    expect(foundGroup).toBeDefined();
    expect(foundGroup?.title).toBe('Updated Test Group');
  });
});
