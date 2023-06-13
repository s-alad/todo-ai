import React from "react";
import s from './navbar.module.scss';

export default function Navbar() {
    return <>
        <nav className={s.navbar}>
            <div className={s.todoai}>todo.ai</div>

            <div className={s.items}>
                <div className={s.about}>about</div>
                <div className={s.team}>help</div>
            </div>

            <div className={s.space}>

            </div>

            <div className={s.actions}>
                <div className={s.login}>login</div>
            </div>
        </nav>

        <div className={s.seperator}></div>

    </>
}