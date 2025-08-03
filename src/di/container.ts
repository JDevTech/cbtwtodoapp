// Repositories
import { AsyncTaskRepository } from '../infrastructure/persistence/async-storage/async-task.repository';
import { AsyncTaskGroupRepository } from '../infrastructure/persistence/async-storage/async-task-group.repository';

// Task Use Cases
import { CreateTaskUseCase } from '../app/usecases/task/create-task.usecase';
import { UpdateTaskUseCase } from '../app/usecases/task/update-task.usecase';
import { DeleteTaskUseCase } from '../app/usecases/task/delete-task.usecase';
import { GetTaskByIdUseCase } from '../app/usecases/task/get-task-by-id.usecase';
import { GetTasksByGroupIdUseCase } from '../app/usecases/task/get-tasks-by-group-id.usecase';

// Task Group Use Cases
import { CreateTaskGroupUseCase } from '../app/usecases/task-group/create-task-group.usecase';
import { UpdateTaskGroupUseCase } from '../app/usecases/task-group/update-task-group.usecase';
import { DeleteTaskGroupUseCase } from '../app/usecases/task-group/delete-task-group.usecase';
import { GetAllTaskGroupsUseCase } from '../app/usecases/task-group/get-all-task-groups.usecase';
import { GetTaskGroupByIdUseCase } from '../app/usecases/task-group/get-task-group-by-id.usecase';

// Repositories Instances
const taskRepository = new AsyncTaskRepository();
const taskGroupRepository = new AsyncTaskGroupRepository();

// Task Use Cases Instances
export const createTaskUseCase = new CreateTaskUseCase(taskRepository);
export const updateTaskUseCase = new UpdateTaskUseCase(taskRepository);
export const deleteTaskUseCase = new DeleteTaskUseCase(taskRepository);
export const getTaskByIdUseCase = new GetTaskByIdUseCase(taskRepository);
export const getTasksByGroupIdUseCase = new GetTasksByGroupIdUseCase(
  taskRepository,
);

// Task Group Use Cases Instances
export const createTaskGroupUseCase = new CreateTaskGroupUseCase(
  taskGroupRepository,
);
export const updateTaskGroupUseCase = new UpdateTaskGroupUseCase(
  taskGroupRepository,
);
export const deleteTaskGroupUseCase = new DeleteTaskGroupUseCase(
  taskGroupRepository,
);
export const getAllTaskGroupsUseCase = new GetAllTaskGroupsUseCase(
  taskGroupRepository,
);
export const getTaskGroupByIdUseCase = new GetTaskGroupByIdUseCase(
  taskGroupRepository,
);
