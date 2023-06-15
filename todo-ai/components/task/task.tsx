import React, { use, useEffect, useState } from "react";

import s from './task.module.scss';
import TextareaAutosize from 'react-textarea-autosize';
import Checkbox from "../ui/checkbox/checkbox";
import { faBolt, faDeleteLeft, faMinus, faRotateLeft, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import uid from "@/utils/uid";
import Action from "../action/action";

import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from "@/firebase/client";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import googleSignup from "@/firebase/sign";
import { useRouter } from "next/navigation";

interface TaskAction {
    id: string,
    content: string,
}

interface TaskInterface {
    id: string,
    content: string,
    subActions: { [fieldName: string]: TaskAction },
    contentSetter: (id: string, content: string) => void,
    taskDeleter: (id: string) => void,
}

export default function Task({ id, content, contentSetter, taskDeleter }: TaskInterface) {

    let [zapLoading, setZapLoading] = useState<boolean>(false)
    let [zapped, setZapped] = useState<boolean>(false)

    let [actionsOrder, setActionsOrder] = useState<Array<string>>([])
    let [actions, setActions] = useState<{ [fieldName: string]: TaskAction }>({})

    



    function createActions(res: Array<string>) {
        let newAddedOrder = []
        let newAddedActions: { [fieldName: string]: TaskAction } = {}

        for (let recievedActionContent of res) {
            console.log(recievedActionContent)
            let newAction: TaskAction = { id: uid(), content: recievedActionContent }
            newAddedOrder.push(newAction.id)
            newAddedActions[newAction.id] = newAction
        }

        setActions({ ...newAddedActions })
        setActionsOrder([...newAddedOrder])
    }

    async function getActions() {
        console.log("createActions")
        setZapLoading(true)

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
                console.log(res)
                createActions(res.output)
                setZapLoading(false)
                if (!zapped) {
                    setZapped(true)
                }
            }
        ).catch(
            (err) => {
                console.log(err)
            }
        )
    }

    function removeAction(id: string) {
        let newActions = { ...actions }
        delete newActions[id as keyof Object]
        setActions(newActions)

        let newOrder = [...actionsOrder]
        newOrder.splice(newOrder.indexOf(id), 1)
        setActionsOrder(newOrder)
    }

    function changeActionContent(id: string, content: string) {
        console.log(id, content)
        let newActions = { ...actions, [id]: { ...actions[id as keyof Object], content: content } }
        setActions(newActions)
    }

    return (
        <div className={s.taskactions}>
            <div className={s.task}>
                <div className={s.check}>
                    <input type="checkbox" className={s.checkbox} />
                </div>
                <TextareaAutosize
                    /* minRows={1}
                    maxRows={3} */
                    value={content}
                    onChange={(e) => { contentSetter(id, e.target.value) }}
                />
                <div className={s.config}>
                    {
                        zapLoading ?
                            <div className={s.circle}>
                                <div className={s.loading}></div>
                            </div>
                            :
                            <div className={s.circle}>
                                {
                                    zapped ?
                                        <FontAwesomeIcon icon={faRotateLeft} style={{ color: "#2cb67d" }} className={s.zap}
                                            onClick={() => { getActions() }}
                                        />
                                        :
                                        <FontAwesomeIcon icon={faBolt} style={{ color: "#2cb67d" }} className={s.zap}
                                            onClick={() => { getActions() }}
                                        />
                                }
                            </div>
                    }
                </div>
                <div className={s.config}>
                    <div className={s.circle}>

                        <FontAwesomeIcon icon={faTrash} className={s.delete}
                            onClick={() => { taskDeleter(id) }}
                        />

                    </div>
                </div>
            </div>

            <div className={s.actions}>
                {
                    actionsOrder.length > 0 &&
                    <div>
                        {
                            actionsOrder.map((actionId: string, index: number) => {
                                return (
                                    <Action
                                        key={actionId}
                                        id={actionId}
                                        content={actions[actionId].content}
                                        actionContentSetter={changeActionContent}
                                        removeAction={removeAction}
                                    />
                                )
                            })
                        }
                    </div>
                }
            </div>

        </div>
    )
}