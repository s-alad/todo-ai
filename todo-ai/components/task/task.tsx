import React, { useState } from "react";

import s from './task.module.scss';
import TextareaAutosize from 'react-textarea-autosize';
import Checkbox from "../ui/checkbox/checkbox";
import { faBolt, faDeleteLeft, faMinus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
interface Task {
    id: string,
    content: string,
    contentSetter: (id: string, content: string) => void,
    taskDeleter: (id: string) => void,
}

export default function Task({ id, content, contentSetter, taskDeleter }: Task) {

    let [actions, setActions] = useState<Array<string>>([])
    function createActions() {
        console.log("createActions")

        let res = fetch("/api/actions")

        let newActions = [...actions, "action"]
        setActions(newActions)
    }

    return (
        <div className={s.taskactions}>
            <div className={s.task}>
                <div className={s.check}>
                    {/* <label className={s.checkbox}>
                    <input type="checkbox"/>
                    <span className={s.checkmark}></span>
                </label> */}
                    {/* <Checkbox /> */}
                    <input type="checkbox" className={s.checkbox} />
                </div>
                <div className={s.content}>
                    <TextareaAutosize
                        className={s.area}
                        minRows={1}
                        maxRows={5}
                        value={content}
                        onChange={(e) => { contentSetter(id, e.target.value) }}
                    />
                    {/*                 <textarea value={content} onChange={(e) => {contentSetter(id, e.target.value)}}> </textarea> */}
                </div>
                <div className={s.action}>
                    <FontAwesomeIcon icon={faBolt} style={{ color: "#2cb67d" }}
                        onClick={() => { createActions() }}
                    />
                </div>
                <div className={s.delete}>
                    <FontAwesomeIcon icon={faTrash} style={{ color: "#000000", }}
                        onClick={() => { taskDeleter(id) }}
                    />
                </div>
            </div>

            <div className={s.actions}>
                {
                    actions.length > 0 &&
                    <div>
                        {
                            actions.map((action: string) => {
                                return (
                                    <div className={s.action}>
                                        <div className={s.check}>
                                            <input type="checkbox" className={s.checkbox} />
                                        </div>
                                        <div className={s.content}>
                                            <TextareaAutosize
                                                className={s.area}
                                                minRows={1}
                                                maxRows={5}
                                                value={""}
                                                onChange={(e) => {  }}
                                            />
                                        </div>
                                        <div className={s.delete}>
                                            <div className={s.remove}>
                                                <FontAwesomeIcon icon={faDeleteLeft} style={{ color: "#000000", }} />
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                }
            </div>

        </div>
    )
}