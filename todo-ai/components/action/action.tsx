import React from "react";

import s from './action.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from 'react-textarea-autosize';

interface TaskAction {
    id: string,
    content: string,

    actionContentSetter: (id: string, content: string) => void,
    removeAction: (id: string) => void,
}

export default function Action( {id, content, removeAction, actionContentSetter}: TaskAction) {

    if (content == undefined || content == "") {
        return null
    }

    return (
        <div className={s.action}>
            <div className={s.check}>
                <input type="checkbox" className={s.checkbox} />
            </div>
            <TextareaAutosize
                /* minRows={1}
                maxRows={3} */
                value={content}
                onChange={(e) => { actionContentSetter(id, e.target.value) }}
            />

            <div className={s.config}>
                <div className={s.circle}>

                    <div className={s.remove} onClick={() => removeAction(id)}>
                        <FontAwesomeIcon icon={faDeleteLeft} style={{ color: "#000000", }} />
                    </div>

                </div>
            </div>
        </div>
    )
}