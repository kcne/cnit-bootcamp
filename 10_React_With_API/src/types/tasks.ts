export interface Task{
    name: string;
    description: string | null;
    status: string;
    priority: string;
    id: number;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    tags?:Tag[]
}

export interface Tag{
    id: number;
    name: string;
}