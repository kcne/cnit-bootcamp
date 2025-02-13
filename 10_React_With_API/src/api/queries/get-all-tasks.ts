import { Task } from "@/types/tasks";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface GetAllTasks {
    tasks: Task[];
}

async function getAllTasks(token?:string): Promise<GetAllTasks> {
  const res = await axios.get<GetAllTasks>('http://localhost:3000/api/tasks/get-all', 
    {headers: { Authorization: `Bearer ${token}` }});
  return res.data;
}

export function useGetAllTasks(token?:string){
  return useQuery<GetAllTasks>({
    queryKey: ['get-all-tasks'],
    queryFn: async() => await getAllTasks(token)
  });
}