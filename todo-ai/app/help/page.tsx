import React from 'react';

import s from '../page.module.scss';
import h from './help.module.scss';
import a from '../about/about.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBolt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

export default function Help() {
    return (
        <div className={s.main}>
            <div className={s.punchline}>
                get started creating actionable tasks
                <span>
                    <FontAwesomeIcon icon={faBolt} style={{ color: "#2cb67d" }} />
                </span> by ai.
            </div>
            <div className={s.tagline}>
                create a task by typing in the input box and pressing the plus button.
            </div>
            <div className={a.try}>
                zap the task <Link href={"/todo"}><div className={a.signup}><FontAwesomeIcon icon={faBolt} style={{ color: "#2cb67d" }} /></div></Link> and immediately get actionable steps.
            </div>

        </div>
    )
}