import { addDoc, collection, getDocs, query, where } from 'firebase/firestore'
import { auth, db, provider } from '../config/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { toast } from 'react-toastify';
import axios from 'axios'

const notifySignIn = () => toast('Succsess Log In!');
const notifySignOut = () => toast('Succsess Log Out!');

export const handleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const userGlobal = result?.user;

        await axios.post("http://localhost:8800/users", {
            displayName: userGlobal?.displayName || '',
            email: userGlobal?.email || '',
            photoURL: userGlobal?.photoURL || '',
            role: 'user',
            uid: userGlobal?.uid || '',
        });

        notifySignIn();
    } catch (err) {
        console.error("Error in SignIn:", err);
    }
};

export const handleSignOut = async (dispatch, setIsAdmin) => {
    dispatch(setIsAdmin(false))
    await signOut(auth);
    notifySignOut();
}


/* export const handleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, provider);
        const userGlobal = result?.user;

        await axios.post("http://localhost:8800/users", {
            displayName: userGlobal?.displayName || '',
            email: userGlobal?.email || '',
            photoURL: userGlobal?.photoURL || '',
            role: 'user',
            uid: userGlobal?.uid || '',
        })
        notifySignIn();
    }

    catch (err) {
        console.error(err);
    }
} */



/* 
const userToAddRef = collection(db, 'users');
const userToAddQuery = query(userToAddRef, where('uid', '==', userGlobal?.uid));
const userSnapshot = await getDocs(userToAddQuery);


if (userSnapshot?.empty) {
    await addDoc(userToAddRef, {
        uid: userGlobal?.uid || '',
        displayName: userGlobal?.displayName || '',
        email: userGlobal?.email || '',
        photoURL: userGlobal?.photoURL || '',
        role: 'user'
    })
} */