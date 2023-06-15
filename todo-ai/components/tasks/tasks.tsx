"use client"

import React, { useEffect, useState } from "react";

import s from './tasks.module.scss';
import Task from "../task/task";
import uid from "@/utils/uid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCirclePlus, faListCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from 'react-textarea-autosize';

import {useAuthState} from 'react-firebase-hooks/auth';
import firebase from "@/firebase/client";
import {useCollectionData} from 'react-firebase-hooks/firestore';
import googleSignup from "@/firebase/sign";
import { useRouter } from "next/navigation";


import { TaskAction } from "@/models/TaskAction";
import { TaskModel } from "@/models/TaskModel";

export default function Tasks() {

    let [ready, setReady] = useState<boolean>(false)

    let [order, setOrder] = useState<Array<string>>([])
    let [tasks, setTasks] = useState<{ [fieldName: string]: TaskModel }>({})

    let [inputTask, setInputTask] = useState<string>("")

    const auth = firebase.auth()
    const [user, loading, error] = useAuthState(auth as any)
    const db = firebase.firestore()

    //when first loaded, get tasks from db
    useEffect(() => {
        const getTasks = async () => {
            let res =  await db.collection("todos").doc(user!.uid).get()
            console.log("result", res.data())
            if ( res.data().order.length > 0) {
                console.log("tasks found", res.data()!.tasks)
                setTasks(res.data()!.tasks)
                setOrder(res.data()!.order)
                setReady(true)
            } else {
                console.log("no tasks")
                setReady(true)
            }
        }

        if (user) {
            const ref = getTasks()
        }
    }, [])

    //when tasks change, update db
    useEffect(() => {
        console.log("tasks changed", tasks, order)
        const updateTasks = async () => {
            /* let lengthOfOrder = order.length
            let dbLengthOfOrder = (await db.collection("todos").doc(user!.uid).get()).data()!.order.length */
            if (ready) {
                console.log("updating tasks")
                await db.collection("todos").doc(user!.uid).set({ tasks: tasks, order: order })
            }
        }

        if (user) {
            const ref = updateTasks()
        }
    }, [tasks, order])

    function addTask() {

        if (inputTask == "") {return }

        let newTask: TaskModel = { id: uid(), content: inputTask, subActions: {}, subActionsOrder: [], checked: false, zapped: false}
        let newTasks = { ...tasks, [newTask.id]: newTask }
        setTasks(newTasks)
        setOrder([...order, newTask.id])
        setInputTask("")
    }

    function changeTaskContent(id: string, content: string) {
        console.log(id, content)
        let newTasks = { ...tasks, [id]: { ...tasks[id as keyof Object], content: content } }
        setTasks(newTasks)
    }

    function changeTaskActions(id: string, actions: { [fieldName: string]: TaskAction }, actionsOrder: Array<string>) {
        console.log(id, actions, actionsOrder)
        let newTasks = { ...tasks, [id]: { ...tasks[id as keyof Object], subActions: actions, subActionsOrder: actionsOrder, zapped: true } }
        setTasks(newTasks)

        //set zapped for task to true

    }

    function changeCheckZapped(id: string, checked: boolean, subzapped: boolean) {
        console.log(id, checked)
        let newTasks = { ...tasks, [id]: { ...tasks[id as keyof Object], checked: checked, zapped: subzapped} }
        setTasks(newTasks)
    }

    function deleteTask(id: string) {
        let newTasks = { ...tasks }
        delete newTasks[id as keyof Object]
        setTasks(newTasks)

        let newOrder = [...order]
        newOrder.splice(newOrder.indexOf(id), 1)
        setOrder(newOrder)
    }

    return (

        <div className={s.todo}>
            <div className={s.taskinput}>
                <FontAwesomeIcon icon={faListCheck} />
                <TextareaAutosize 
                    /* type="text" */
                    placeholder="add task"
                    value={inputTask}
                    onChange={(e) => setInputTask(e.target.value)}
                />
                <div className={s.add} onClick={addTask}>
                    <div className={s.circle}>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
            </div>
            <div className={s.tasks}>
                {order.map((id: string) => {
                    return (
                        <Task
                            key={id}
                            id={id}
                            checked={tasks[id as keyof Object].checked}
                            zapped={tasks[id as keyof Object].zapped}
                            checkZapSetter={changeCheckZapped}

                            content={tasks[id as keyof Object].content}
                            contentSetter={changeTaskContent}
                            taskDeleter={deleteTask}

                            subActions={tasks[id as keyof Object].subActions}
                            subActionsOrder={tasks[id as keyof Object].subActionsOrder}
                            /* actionOrderSetter={changeTaskActionsOrder} */
                            actionSetter={changeTaskActions}
                        />
                    )
                })}
            </div>
        </div>

    )
}