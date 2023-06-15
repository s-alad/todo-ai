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
import { TaskAction } from "@/models/TaskAction";
import { TaskModel } from "@/models/TaskModel";

interface TaskComponent extends TaskModel {


    contentSetter: (id: string, content: string) => void,
    checkSetter: (id: string, checked: boolean) => void,
    taskDeleter: (id: string) => void,
    actionSetter: (id: string, actions: { [fieldName: string]: TaskAction }, order: Array<string>) => void,
}

export default function Task(
    { id, content, checked, checkSetter, contentSetter, taskDeleter, subActions, subActionsOrder, actionSetter, /* actionOrderSetter */ }: TaskComponent) {

    let [zapLoading, setZapLoading] = useState<boolean>(false)
    let [zapped, setZapped] = useState<boolean>(false)

    function createActions(res: Array<string>) {
        let newAddedOrder = []
        let newAddedActions: { [fieldName: string]: TaskAction } = {}

        for (let recievedActionContent of res) {
            console.log(recievedActionContent)
            let newAction: TaskAction = { id: uid(), content: recievedActionContent, checked: false }
            newAddedOrder.push(newAction.id)
            newAddedActions[newAction.id] = newAction
        }

        /* setActions({ ...newAddedActions })
        setActionsOrder([...newAddedOrder]) */
        console.log("newly created actions", newAddedActions, newAddedOrder)
        actionSetter(id, {...newAddedActions}, [...newAddedOrder])
        /* actionOrderSetter(id, newAddedOrder) */
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

    function removeAction(subid: string) {
        let newActions = { ...subActions }
        delete newActions[subid as keyof Object]
        /* setActions(newActions) */

        let newOrder = [...subActionsOrder]
        newOrder.splice(newOrder.indexOf(subid), 1)
        /* setActionsOrder(newOrder) */

        /* actionSetter(id, newActions)
        actionOrderSetter(id, newOrder) */
        actionSetter(id, newActions, newOrder)
    }

    function changeActionContent(subid: string, content: string) {
        console.log(subid, content)
        let newActions = { ...subActions, [subid]: { ...subActions[subid as keyof Object], content: content } }
        /* setActions(newActions) */
        /* actionSetter(id, newActions) */
        actionSetter(id, newActions, subActionsOrder)
    }

    return (
        <div className={s.taskactions}>
            <div className={s.task}>
                <div className={s.check}>
                    <input type="checkbox" className={s.checkbox} checked={checked} onChange={
                        (e) => {
                            console.log(e.target.checked)
                            checkSetter(id, e.target.checked)
                        }
                    } />
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
                    subActionsOrder.length > 0 &&
                    <div>
                        {
                            subActionsOrder.map((actionId: string, index: number) => {
                                return (
                                    <Action
                                        key={actionId}
                                        id={actionId}
                                        content={subActions[actionId].content}
                                        checked={subActions[actionId].checked}
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