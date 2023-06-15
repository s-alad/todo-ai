"use client"

import React from "react";

import s from './todo.module.scss';
import t from '../../components/instant/instant.module.scss'


import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from "@/firebase/client";
import Link from "next/link";
import Tasks from "@/components/tasks/tasks";

export default function Todo() {
    const auth = firebase.auth()
    const [user, loading, error] = useAuthState(auth as any)
    console.log("user state", user, loading, error)
    if (!user) {
        return (
            <div className={s.todo}>
                <div className={t.try}>
                    Please <Link href={"/signup"}><div className={t.signup}>login</div></Link> to continue
                </div>
            </div>
        )
    }

    return (
        <div className={s.todo}>
            <div className={s.welcome}>
                Hi, {user.displayName}
            </div>
            <Tasks />
        </div>
    )
}