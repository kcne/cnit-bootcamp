export interface CreateTask{
    name: string;
    description?:string,
    status: "NEW" | "IN PROGRESS" | "DONE",
    priority: "LOW" | "MEDIUM" | "MODERATE",
    userId: number
}

export interface UpdateTask{
    taskId: number,
    name?: string;
    description?:string,
    status?: "NEW" | "IN PROGRESS" | "DONE",
    priority?: "LOW" | "MEDIUM" | "MODERATE",
    userId: number
}