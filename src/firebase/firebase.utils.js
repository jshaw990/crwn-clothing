import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyDzuKSE8Ml4iWui4nUvDIAKdsuQ64jwOPs",
    authDomain: "crwn-clothing-f765c.firebaseapp.com",
    databaseURL: "https://crwn-clothing-f765c.firebaseio.com",
    projectId: "crwn-clothing-f765c",
    storageBucket: "crwn-clothing-f765c.appspot.com",
    messagingSenderId: "643292273404",
    appId: "1:643292273404:web:1eac2abdc6274b0c679579",
    measurementId: "G-JJ1NG111NJ"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);
  
export default firebase;