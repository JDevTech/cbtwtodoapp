import { GetAllTaskGroupsUseCase } from '../../../src/app/usecases/task-group/get-all-task-groups.usecase';
import { TaskGroupEntity } from '../../../src/domain/entities/task-group.entity';
import { InMemoryTaskGroupRepository } from '../../mocks/in-memory-task-group-repository';

describe('GetAllTaskGroupsUseCase', () => {
  it('should return all task groups', async () => {
    const tasksRepository = new InMemoryTaskGroupRepository();
    const getAllTaskGroupsUseCase = new GetAllTaskGroupsUseCase(
      tasksRepository,
    );

    const taskGroup1: TaskGroupEntity = {
      id: 'group-1',
      title: 'Test Group 1',
      createdAt: new Date(),
    };

    const taskGroup2: TaskGroupEntity = {
      id: 'group-2',
      title: 'Test Group 2',
      createdAt: new Date(),
    };

    await tasksRepository.createTaskGroup(taskGroup1);
    await tasksRepository.createTaskGroup(taskGroup2);

    const result = await getAllTaskGroupsUseCase.execute();

    expect(result).toHaveLength(2);
    expect(result).toEqual(expect.arrayContaining([taskGroup1, taskGroup2]));
  });
});
