import * as firebase from 'firebase/app';
import { CONFIG } from './utils';

const app = firebase.initializeApp(CONFIG);

if (process.env.NODE_ENV !== 'production') (window as any).firebase = app;
export default app;
