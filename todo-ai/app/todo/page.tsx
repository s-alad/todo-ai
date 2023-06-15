"use client"

import React, { useState } from "react";

import s from './todo.module.scss';
import t from '../../components/instant/instant.module.scss';
import l from '@/styles/loader.module.scss';


import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from "@/firebase/client";
import Link from "next/link";
import Tasks from "@/components/tasks/tasks";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faBriefcase, faHome, faHouse, faPerson } from "@fortawesome/free-solid-svg-icons";

export default function Todo() {
    const auth = firebase.auth()
    const [user, loading, error] = useAuthState(auth as any)
    console.log("user state", user, loading, error)

    let [currentGroup, setCurrentGroup] = useState<string>("home")

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
            <div className={s.welcome} onClick={() => console.log(currentGroup)}>
                Hi, {user.displayName}
            </div>
            <div className={s.todos}>
                <div className={s.categories}>
                    <div className={`${s.category} ${currentGroup == "home" ? s.selected : ''}`}>
                        <FontAwesomeIcon icon={faHouse} className={s.delete} onClick={() => setCurrentGroup("home")}/>
                    </div>
                    <div className={`${s.category} ${currentGroup == "work" ? s.selected : ''}`}>
                        <FontAwesomeIcon icon={faBriefcase} className={s.delete} onClick={() => setCurrentGroup("work")}/>
                    </div>
                    <div className={`${s.category} ${currentGroup == "personal" ? s.selected : ''}`}>
                        <FontAwesomeIcon icon={faPerson} className={s.delete} onClick={() => setCurrentGroup("personal")}/>
                    </div>
                    <div className={`${s.category} ${currentGroup == "instant" ? s.selected : ''}`}>
                        <FontAwesomeIcon icon={faBolt} className={s.delete} onClick={() => setCurrentGroup("instant")}/>
                    </div>
                </div>
                <Tasks group={currentGroup} />
            </div>
        </div>
    )
}