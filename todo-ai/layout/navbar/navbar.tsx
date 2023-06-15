import React from "react";
import s from './navbar.module.scss';
import LoginButton from "@/components/ui/loginbtn/loginbtn";
import Link from "next/link";

export default function Navbar() {
    return <>
        <nav className={s.navbar}>
            <Link href={"/"}><div className={s.todoai}>todo.ai</div></Link>

            <div className={s.items}>
                <div className={s.about}>about</div>
                <div className={s.help}>help</div>
                <Link href={"/todo"}><div className={s.app}>app</div></Link>
            </div>

            <div className={s.space}>

            </div>

            <div className={s.actions}>
                <LoginButton />
            </div>
        </nav>

        <div className={s.seperator}></div>

    </>
}