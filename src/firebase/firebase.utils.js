import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBiUBIceBPEKwAPFUo6ZTzaS2qo5nfG0tk",
    authDomain: "crwn-db-4b05e.firebaseapp.com",
    projectId: "crwn-db-4b05e",
    storageBucket: "crwn-db-4b05e.appspot.com",
    messagingSenderId: "233666633012",
    appId: "1:233666633012:web:602397a68861624cc69961",
    measurementId: "G-PJCTT1D485"
  };

  firebase.initializeApp(config);

  export const createUserProfileDocument = async(userAuth, additionalData) => {
    if (!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
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
  }

  export const auth = firebase.auth();
  export const firestore = firebase.firestore();

  const provider = new firebase.auth.GoogleAuthProvider();
  provider.setCustomParameters({ prompt: 'select_account' });

  export const signInWithGoogle = () => auth.signInWithPopup(provider);

  export default firebase;