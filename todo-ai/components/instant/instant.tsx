"use client"

import React from "react";

import s from './instant.module.scss';
import Tasks from "../tasks/tasks";
import Link from "next/link";

import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from "@/firebase/client";

export default function Instant() {

    const auth = firebase.auth()
    const [user, loading, error] = useAuthState(auth as any)

    if (loading) {
        return (
            <div>loading</div>
        )
    }

    if (user) {
        return (
            <>
                <div className={s.try}>
                    try it instantly below or <Link href={"/todo"}><div className={s.signup}>go to your tasks</div></Link>
                </div>
                <Tasks />
            </>
        )
    }

    return (
        <>
            <div className={s.try}>
                try it instantly below or <Link href={"/signup"}><div className={s.signup}>sign up</div></Link> to save your tasks.
            </div>
            <Tasks />
        </>
    )
}