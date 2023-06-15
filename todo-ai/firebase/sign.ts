import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import firebase from "./client";

import { useRouter } from 'next/navigation';


const googleProvider = new GoogleAuthProvider();

const auth = firebase.auth()

export default async function googleSignup(user: any): Promise<boolean> {
    try {
        /* console.log("signing in") */
        const res = await signInWithPopup(firebase.auth(), googleProvider)
        /* console.log(res)
        console.log(res.user) */

        let user = res.user
        let userRef = firebase.firestore().collection("users").doc(user.uid)
        let doc = await userRef.get()
        if (!doc.exists) {
            console.log("creating user")
            await userRef.set({
                uid: user.uid,
                email: user.email,
                name: user.displayName,
            })
        } else {
            console.log("user already exists")
        }

        let collections = ["home", "personal", "work", "instant"]
        for (let col of collections) {
            let tasksRef = firebase.firestore().collection("todos").doc(user.uid).collection(col).doc("tasks")
            let tasksDoc = await tasksRef.get()
            if (!tasksDoc.exists) {
                console.log("creating tasks")
                await tasksRef.set({
                    tasks: {},
                    order: []
                })
            } else {
                console.log("tasks already exist")
            }
        }
        return true
    } catch (error) {
        console.log(error)
        return false
    }
    return true 
}