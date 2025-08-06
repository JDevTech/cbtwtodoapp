// Repositories
import { getTaskRepository } from '../providers/task-repository.factory';
import { getTaskGroupRepository } from '../providers/task-group-repository.factory';
import { ProviderRepositoryType } from '@/domain/types/provider-repository.type';

// Task Use Cases
import { CreateTaskUseCase } from '../../app/usecases/task/create-task.usecase';
import { UpdateTaskUseCase } from '../../app/usecases/task/update-task.usecase';
import { DeleteTaskUseCase } from '../../app/usecases/task/delete-task.usecase';
import { GetTaskByIdUseCase } from '../../app/usecases/task/get-task-by-id.usecase';
import { GetTasksByGroupIdUseCase } from '../../app/usecases/task/get-tasks-by-group-id.usecase';

// Task Group Use Cases
import { CreateTaskGroupUseCase } from '../../app/usecases/task-group/create-task-group.usecase';
import { UpdateTaskGroupUseCase } from '../../app/usecases/task-group/update-task-group.usecase';
import { DeleteTaskGroupUseCase } from '../../app/usecases/task-group/delete-task-group.usecase';
import { GetAllTaskGroupsUseCase } from '../../app/usecases/task-group/get-all-task-groups.usecase';
import { GetTaskGroupByIdUseCase } from '../../app/usecases/task-group/get-task-group-by-id.usecase';

// Set up the provider for collections
const PROVIDER_REPOSITORY: ProviderRepositoryType = 'firestore';

// Repositories Instances
const taskRepo = getTaskRepository(PROVIDER_REPOSITORY);
const groupRepo = getTaskGroupRepository(PROVIDER_REPOSITORY);

// Task Use Cases Instances
export const createTaskUseCase = new CreateTaskUseCase(taskRepo);
export const updateTaskUseCase = new UpdateTaskUseCase(taskRepo);
export const deleteTaskUseCase = new DeleteTaskUseCase(taskRepo);
export const getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepo);
export const getTasksByGroupIdUseCase = new GetTasksByGroupIdUseCase(taskRepo);

// Task Group Use Cases Instances
export const createTaskGroupUseCase = new CreateTaskGroupUseCase(groupRepo);
export const updateTaskGroupUseCase = new UpdateTaskGroupUseCase(groupRepo);
export const deleteTaskGroupUseCase = new DeleteTaskGroupUseCase(groupRepo);
export const getAllTaskGroupsUseCase = new GetAllTaskGroupsUseCase(groupRepo);
export const getTaskGroupByIdUseCase = new GetTaskGroupByIdUseCase(groupRepo);
