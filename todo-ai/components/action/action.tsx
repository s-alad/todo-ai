import React from "react";

import s from './action.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBolt, faDeleteLeft } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from 'react-textarea-autosize';
import { TaskAction } from "@/models/TaskAction";

interface TaskComponent extends TaskAction {
    actionContentSetter: (id: string, content: string, subchecked: boolean) => void,
    removeAction: (id: string) => void,
}

export default function Action( {id, content, checked, removeAction, actionContentSetter}: TaskComponent) {

    if (content == undefined || content == "") {
        return null
    }

    return (
        <div className={s.action}>
            <div className={s.check}>
                <input type="checkbox" className={s.checkbox} checked={checked} onChange={
                    (e) => { 
                        actionContentSetter(id, content, e.target.checked)
                    }
                } />
            </div>
            <TextareaAutosize
                /* minRows={1}
                maxRows={3} */
                value={content}
                onChange={(e) => { actionContentSetter(id, e.target.value, checked) }}
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