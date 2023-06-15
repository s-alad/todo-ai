import { TaskAction } from "./TaskAction";

export interface TaskModel {
    id: string,
    content: string,
    checked: boolean,
    zapped: boolean,
    subActions: { [fieldName: string]: TaskAction },
    subActionsOrder: Array<string>,
}