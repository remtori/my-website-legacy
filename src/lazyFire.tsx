import { from, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const CONFIG = {
    apiKey: "AIzaSyBOa2JE6cWwrN-5NgiTItXTkP3a47w7xVs",
    databaseURL: "https://lqv-remtori.firebaseio.com",
    storageBucket: "lqv-remtori.appspot.com",
    authDomain: "lqv-remtori.firebaseapp.com",
    messagingSenderId: "363928283563",
    projectId: "lqv-remtori",
};

let fire: Observable<any> | null;

export default function lazyFire()
{
    if (fire != null)
    {
        return fire;
    }

    const app$ = from(import('firebase/app'));
    const database$ = from(import('firebase/database'));
    const rxfire$ = from(import('rxfire/database'));

    fire = combineLatest(app$, rxfire$, database$)
        .pipe(
            map(([ firebase, database ]) => {

                const app = firebase.apps[0] ||
                    firebase.initializeApp(CONFIG);

                return {
                    app,
                    database,
                };
            })
        );

    return fire;
}
