const user = {

    init() {

        if (firebase == null) {
            setTimeout(() => {
                user.init();
            }, 200);

            return;
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                if (this.onSignIn)
                    this.onSignIn(user);
            } else {
                if (this.onSignOut)
                    this.onSignOut();
            }
        });
    },

    getUserName() {
        return firebase.auth().currentUser.displayName;
    },

    getUserId() {
        return firebase.auth().currentUser.uid;
    },

    isUserSignedIn() {
        return !! firebase.auth().currentUser;
    },
    
    signIn() {
        // Sign in Firebase using popup auth and Google as the identity provider.
        let provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider);
    },
    
    signOut() {  
        firebase.auth().signOut();
    },
}

user.init();

export default user;