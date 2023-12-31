"use client"

import React from "react";

import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from "@/firebase/client";
import { useRouter } from 'next/navigation';
import s from './loginbtn.module.scss';
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";
import googleSignup from "@/firebase/sign";

export default function LoginButton() {
    const router = useRouter()
    const auth = firebase.auth()
    const [user, loading, error] = useAuthState(auth as any)
    const googleProvider = new GoogleAuthProvider();

    function signOut() {
        firebase.auth().signOut()
        router.push("/")
    }

    async function signUp() {
        googleSignup(user).then(() => {
            router.push("/todo")
        })
    }

    if (!user) {
        return (
            <>
            <div className={s.login} onClick={() => signUp()}>login</div>
            </>
        )
    } else {
        return (
            <div className={s.login} onClick={signOut}>log out</div>
        )
    }
}