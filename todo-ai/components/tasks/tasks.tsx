"use client"

import React, { useEffect, useState } from "react";

import s from './tasks.module.scss';
import Task from "../task/task";
import uid from "@/utils/uid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdd, faCirclePlus, faListCheck, faPlus } from "@fortawesome/free-solid-svg-icons";
import TextareaAutosize from 'react-textarea-autosize';

interface TaskAction {
    id: string,
    content: string,
}

interface TaskInterface {
    id: string,
    content: string,
    subActions: { [fieldName: string]: TaskAction },
}

export default function Tasks() {

    let [order, setOrder] = useState<Array<string>>([])
    let [tasks, setTasks] = useState<{ [fieldName: string]: TaskInterface }>({})


    let [inputTask, setInputTask] = useState<string>("")

    function addEmptyTask() {
        let newTask: TaskInterface = { id: uid(), content: "", subActions: {}}
        let newTasks = { ...tasks, [newTask.id]: newTask }
        setTasks(newTasks)
        setOrder([...order, newTask.id])
    }

    function addTask() {

        if (inputTask == "") {
            return 
        }

        let newTask: TaskInterface = { id: uid(), content: inputTask, subActions: {}}
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
                            content={tasks[id as keyof Object].content}
                            subActions={tasks[id as keyof Object].subActions}
                            contentSetter={changeTaskContent}
                            taskDeleter={deleteTask}
                        />
                    )
                })}
            </div>
        </div>

    )
}