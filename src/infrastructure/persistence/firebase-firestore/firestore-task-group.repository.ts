import {
  doc,
  getDoc,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  collection,
} from '@react-native-firebase/firestore';
import { firestore } from './firebase.config';
import { TaskGroupEntity } from '@/domain/entities/task-group.entity';
import { CreateTaskGroupEntity } from '@/domain/entities/create-task-group.entity';
import { ITaskGroupRepository } from '@/domain/interfaces/task-group-repository.interface';

export class FirestoreTaskGroupRepository implements ITaskGroupRepository {
  private collectionRef = collection(firestore, 'taskGroups');

  async deleteTaskGroup(id: string): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    await deleteDoc(docRef);
  }

  async getAllTaskGroups(): Promise<TaskGroupEntity[]> {
    const snapshot = await getDocs(this.collectionRef);
    return snapshot.docs.map((item: { id: any; data: () => any }) => ({
      id: item.id,
      ...item.data(),
    })) as TaskGroupEntity[];
  }

  async getTaskGroupById(id: string): Promise<TaskGroupEntity | null> {
    const docSnap = await getDoc(doc(this.collectionRef, id));
    if (!docSnap.exists()) return null;
    const data = docSnap.data();
    if (!data) return null;

    return { id: docSnap.id, ...data } as TaskGroupEntity;
  }

  async createTaskGroup(
    group: CreateTaskGroupEntity,
  ): Promise<TaskGroupEntity> {
    const entity = {
      ...group,
      createdAt: new Date(),
    };
    const docRef = await addDoc(this.collectionRef, entity);
    return { ...entity, id: docRef.id };
  }

  async updateTaskGroup(
    id: string,
    group: Partial<TaskGroupEntity>,
  ): Promise<void> {
    const docRef = doc(this.collectionRef, id);
    await updateDoc(docRef, group);
  }
}
