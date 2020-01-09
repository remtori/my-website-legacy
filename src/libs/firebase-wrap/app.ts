import * as firebase from 'firebase/app';
import { CONFIG } from './utils';

const app = firebase.initializeApp(CONFIG);

export default app;
(window as any).firebase = app;
