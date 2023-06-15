"use client"

import React from "react";

import s from './todo.module.scss';
import t from '../../components/instant/instant.module.scss';
import l from '@/styles/loader.module.scss';


import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from "@/firebase/client";
import Link from "next/link";
import Tasks from "@/components/tasks/tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faHome, faHouse, faPerson } from "@fortawesome/free-solid-svg-icons";

export default function Todo() {
    const auth = firebase.auth()
    const [user, loading, error] = useAuthState(auth as any)
    console.log("user state", user, loading, error)

    if (loading) {
        return (
            <div className={s.todo}>
            <div className={s.welcome}>
                <div className={l.loading}></div>
            </div>
        </div>
        )
    }

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
            <div className={s.todos}>
                <div className={s.categories}>
                    <div className={s.category}>
                        <FontAwesomeIcon icon={faHouse} className={s.delete}/>
                    </div>
                    <div className={s.category}>
                        <FontAwesomeIcon icon={faBriefcase} className={s.delete}/>
                    </div>
                    <div className={s.category}>
                        <FontAwesomeIcon icon={faPerson} className={s.delete}/>
                    </div>
                </div>
                <Tasks />
            </div>
        </div>
    )
}