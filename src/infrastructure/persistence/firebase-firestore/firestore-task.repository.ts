import {
  doc,
  getDoc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
  query,
  where,
} from '@react-native-firebase/firestore';
import { firestore } from './firebase.config';
import { TaskEntity } from '@/domain/entities/task.entity';
import { CreateTaskEntity } from '@/domain/entities/create-task.entity';
import { ITaskRepository } from '@/domain/interfaces/task-repository.interface';

export class FirestoreTaskRepository implements ITaskRepository {
  private collectionRef = collection(firestore, 'tasks');

  async deleteTask(id: string): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    await deleteDoc(docRef);
  }

  async getTaskById(id: string): Promise<TaskEntity | null> {
    const docSnap = await getDoc(doc(this.collectionRef, id));
    if (!docSnap.exists()) return null;
    const data = docSnap.data();
    if (!data) return null;

    return { id: docSnap.id, ...data } as TaskEntity;
  }

  async getTasksByGroupId(id: string): Promise<TaskEntity[]> {
    const q = query(this.collectionRef, where('groupId', '==', id));
    const snapshot = await getDocs(q);
    return snapshot.docs.map((item: any) => ({
      id: item.id,
      ...item.data(),
    })) as TaskEntity[];
  }

  createTask(task: CreateTaskEntity): Promise<TaskEntity> {
    const entity = {
      ...task,
      createdAt: new Date(),
    };
    return addDoc(this.collectionRef, entity).then(docRef => ({
      ...entity,
      id: docRef.id,
    }));
  }

  async updateTask(id: string, task: Partial<TaskEntity>): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    await updateDoc(docRef, task);
  }
}
