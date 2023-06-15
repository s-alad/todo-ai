"use client"

import React from "react";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import s from './signup.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from "@/firebase/client";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import googleSignup from "@/firebase/sign";
import { useRouter } from "next/navigation";

export default function Signup() {

    const googleProvider = new GoogleAuthProvider();

    const auth = firebase.auth()
    const [user, loading, error] = useAuthState(auth as any)

    function move() {
        let router = useRouter()
        router.push("/todo")
    }

    return (
        <div className={s.signup}>
            <div className={s.google} onClick={() => googleSignup(user, move)}>
                <div className={s.icon}>
                    <img src="/google.png" />
                </div>
                <div className={s.text}>access with google</div>
            </div>
        </div>
    )
}