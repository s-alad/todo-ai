"use client"

import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import firebase from "@/firebase/client";
import s from './signup.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Signup() {

    const googleProvider = new GoogleAuthProvider();

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
                <div className={s.text}>google signup</div>
            </div>
        </div>
    )
}