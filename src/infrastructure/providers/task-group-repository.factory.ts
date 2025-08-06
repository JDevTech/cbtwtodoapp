import { ProviderRepositoryType } from '@/domain/types/provider-repository.type';
import { ITaskGroupRepository } from '@/domain/interfaces/task-group-repository.interface';
import { AsyncTaskGroupRepository } from '../persistence/async-storage/async-task-group.repository';
import { FirestoreTaskGroupRepository } from '../persistence/firebase-firestore/firestore-task-group.repository';

export const getTaskGroupRepository = (
  provider: ProviderRepositoryType,
): ITaskGroupRepository => {
  switch (provider) {
    case 'firestore':
      return new FirestoreTaskGroupRepository();
    case 'async':
      return new AsyncTaskGroupRepository();
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
};
