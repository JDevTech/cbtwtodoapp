import { ITaskRepository } from '@/domain/interfaces/task-repository.interface';
import { ProviderRepositoryType } from '@/domain/types/provider-repository.type';
import { AsyncTaskRepository } from '../persistence/async-storage/async-task.repository';
import { FirestoreTaskRepository } from '../persistence/firebase-firestore/firestore-task.repository';

export const getTaskRepository = (
  provider: ProviderRepositoryType,
): ITaskRepository => {
  switch (provider) {
    case 'firestore':
      return new FirestoreTaskRepository();
    case 'async':
      return new AsyncTaskRepository();
    default:
      throw new Error(`Unknown provider: ${provider}`);
  }
};
