"use client"

import React from "react";

import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from "@/firebase/client";
import { useRouter } from 'next/navigation';
import s from './loginbtn.module.scss';
import Link from "next/link";
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect } from "firebase/auth";

export default function LoginButton() {
    const router = useRouter()
    const auth = firebase.auth()
    const [user, loading, error] = useAuthState(auth as any)
    const googleProvider = new GoogleAuthProvider();

    function signOut() {
        firebase.auth().signOut()
        router.push("/")
    }

    async function signIn() {
        try {
            const res = await signInWithPopup(firebase.auth(), googleProvider)
            console.log("signed in")
            console.log(res, user)
            router.push("/todo")
        } catch (error) {
            console.log(error)
        }
    }

    if (!user) {
        return (
            <>
            <div className={s.login} onClick={signIn}>login</div>
            {/* <Link href={"/signup"}><div className={s.login}>login</div></Link> */}
            </>
        )
    } else {
        return (
            <div className={s.login} onClick={signOut}>log out</div>
        )
    }
}