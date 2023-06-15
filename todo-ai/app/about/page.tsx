import React from "react";
import s from '../page.module.scss';
import a from './about.module.scss';
import { faBolt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

export default function About() {
    return (
        <div className={s.main}>
            <div className={s.punchline}>
                a todo list
                <span>
                    <FontAwesomeIcon icon={faBolt} style={{ color: "#2cb67d" }} />
                </span> by ai.
            </div>
            <div className={s.tagline}>
                create a task and get actionable steps to increase your productivity.
            </div>
            <div className={a.try}>
                created with <Link href={"https://github.com/s-alad/todo-ai"}><div className={a.signup}>code</div></Link>
            </div>
            <div className={a.technology}>
                {/* <img src="/ts.png" />
                <img src="/sass.png" />
                <img src="/firebase.png" />
                <img src="/langchain.png" /> */}
                <div className={a.tech}><img src="/nextjs.png" /></div>
                <div className={a.tech}><img src="/ts.png" /></div>
                <div className={a.tech}><img src="/sass.png" /></div>
                <div className={a.tech}><img src="/firebase.png" /></div>
                <div className={a.tech}><img src="/langchain.png" /></div>
                <div className={`${a.tech}`}><img src="/openai.png" className={a.openai} /></div>
            </div>
        </div>
    )
}