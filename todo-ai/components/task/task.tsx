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
    async function createActions() {
        console.log("createActions")

        let res = fetch("/api/actions", {
            method: "POST",
            body: JSON.stringify({ task: content }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(
            (res) => {
                console.log(res)
                return res.json()
            }
        ).then(
            (res) => {
                console.log(res.output)
                let recievedActions: string[] = res.output
                
                let newActions = [...actions]
                recievedActions.forEach((action: string) => {
                        newActions.push(action)
                    }
                )
                setActions(newActions)
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
    }

    function removeAction(index: number) {
        console.log("removeAction")
        let newActions = [...actions]
        newActions.splice(index, 1)
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
                            actions.map((action: string, index: number) => {
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
                                                value={action}
                                                onChange={(e) => {  }}
                                            />
                                        </div>
                                        <div className={s.delete}>
                                            <div className={s.remove} onClick={() => removeAction(index)}>
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