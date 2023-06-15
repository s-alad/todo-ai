"use client"

import React from "react";

import s from './todo.module.scss';
import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from "@/firebase/client";

export default function Todo() {
    const auth = firebase.auth()
    const [user, loading, error] = useAuthState(auth as any)
    console.log("user state", user, loading, error)
    if (!user) {
        return (
            <div>Not logged in</div>
        )
    }

    return (
        <div>
            logged in
        </div>
    )
}