import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "./client";

import { useRouter } from 'next/navigation';


const googleProvider = new GoogleAuthProvider();

const auth = firebase.auth()

export default async function googleSignup(user: any, move: Function) {
    try {
        const res = await signInWithPopup(firebase.auth(), googleProvider)
        console.log(res)
        console.log("signed in")
        console.log(res.user)

        //check if user exists in firestore users collection
        //if not, create user in firestore users collection
        //if so, do nothing
        //redirect to dashboard

        let user = res.user
        let userRef = firebase.firestore().collection("todos").doc(user.uid)
        let doc = await userRef.get()
        if (!doc.exists) {
            console.log("creating user")
            await userRef.set({
                uid: user.uid,
                email: user.email,
                name: user.displayName,
                tasks: {}
            })
        } else {
            console.log("user already exists")
        }
        move()
    } catch (error) {
        console.log(error)
    }
}