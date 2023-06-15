"use client"

import React from "react";
import s from './signup.module.scss';
import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from "@/firebase/client";
import googleSignup from "@/firebase/sign";
import { useRouter } from "next/navigation";

export default function Signup() {

    const auth = firebase.auth()
    const [user, loading, error] = useAuthState(auth as any)

    const router = useRouter()

    async function signUp() {
        googleSignup(user).then(() => {
            router.push("/todo")
        })
    }

    return (
        <div className={s.signup}>
            <div className={s.google} onClick={() => signUp()}>
                <div className={s.icon}>
                    <img src="/google.png" />
                </div>
                <div className={s.text}>access with google</div>
            </div>
        </div>
    )
}