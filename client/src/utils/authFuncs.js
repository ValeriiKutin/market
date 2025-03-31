import { addDoc, collection } from 'firebase/firestore'
import { auth, db, provider } from '../config/firebase'
import { signInWithPopup, signOut } from 'firebase/auth'
import { toast } from 'react-toastify';

const notifySignIn = () => toast('Succsess Sign In!');
const notifySignOut = () => toast('Succsess Sign Out!');

export const handleSignIn = async () => {
    try {
        
        const result = await signInWithPopup(auth, provider);
        const user = result.user;
        const userToAddRef = collection(db, 'users');
        await addDoc(userToAddRef, {
            uid: user?.uid || '',
            displayName: user?.displayName || '',
            email: user?.email || '',
            photoURL: user?.photoURL || '',
            role: 'user'
        })
        notifySignIn();
    }

    catch (err) {
        console.err(err);
    }
}

export const handleSignOut = async () => {
    await signOut(auth);
    notifySignOut();
}