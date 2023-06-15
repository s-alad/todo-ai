"use client"

import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import s from './signup.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from "@/firebase/client";
import {useCollectionData} from 'react-firebase-hooks/firestore';

export default function Signup() {

    const googleProvider = new GoogleAuthProvider();

    const auth = firebase.auth()
    const [user, loading, error] = useAuthState(auth as any)

    console.log("user state", user, loading, error)


    async function googleSignup() {
        try {
            const res = await signInWithPopup(firebase.auth(), googleProvider)
            console.log(res)
            console.log("signed in")
            console.log(res.user)

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={s.signup}>
            <div className={s.google} onClick={googleSignup}>
                <div className={s.icon}>
                    <img src="/google.png" />
                </div>
                <div className={s.text}>access with google</div>
            </div>
        </div>
    )
}