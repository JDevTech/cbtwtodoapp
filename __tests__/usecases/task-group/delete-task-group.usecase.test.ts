import { TaskGroupEntity } from '../../../src/domain/entities/task-group.entity';
import { InMemoryTaskGroupRepository } from '../../mocks/in-memory-task-group-repository';
import { DeleteTaskGroupUseCase } from '../../../src/app/usecases/task-group/delete-task-group.usecase';

describe('DeleteTaskGroupUseCase', () => {
  it('should delete a task group', async () => {
    const tasksRepository = new InMemoryTaskGroupRepository();
    const deleteTaskGroupUseCase = new DeleteTaskGroupUseCase(tasksRepository);

    const taskGroup: TaskGroupEntity = {
      id: 'group-1',
      title: 'Test Group',
      createdAt: new Date(),
    };

    await tasksRepository.createTaskGroup(taskGroup);

    await deleteTaskGroupUseCase.execute('group-1');

    const foundGroup = await tasksRepository.getTaskGroupById('group-1');
    expect(foundGroup).toBeNull();
  });
});
