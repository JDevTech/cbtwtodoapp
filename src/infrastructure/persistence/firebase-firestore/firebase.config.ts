import { getFirestore } from '@react-native-firebase/firestore';
import { getApps, initializeApp } from '@react-native-firebase/app';

const firebaseConfig = {
  projectId: 'cbtwtodoapp',
  messagingSenderId: '674481162280',
  authDomain: 'cbtwtodoapp.firebaseapp.com',
  storageBucket: 'cbtwtodoapp.firebasestorage.app',
  apiKey: 'AIzaSyCgWVdLYCHgxJtvT-DT7m7Wn3RF5DXlm-s',
  appId: '1:674481162280:android:dd237cf25b3d7a16418d1d',
};

const firebaseApp = getApps().length
  ? getApps()[0]
  : await initializeApp(firebaseConfig);

export const firestore = getFirestore(firebaseApp);
