import { TaskAction } from "./TaskAction";

export interface TaskModel {
    checked: boolean,
    id: string,
    content: string,
    subActions: { [fieldName: string]: TaskAction },
    subActionsOrder: Array<string>,
}