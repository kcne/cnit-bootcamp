import { CreateAppClient, Metadata } from "@/types/metadata";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";


async function updateMetadata(data:CreateAppClient): Promise<Metadata> {
  const res = await axios.post<Metadata>('http://localhost:3000/api/metadata', data);
  return res.data;
}

export function useUpdateMetadata(){
 const queryClient = useQueryClient();
  return useMutation<Metadata, unknown, CreateAppClient>({
    mutationKey: ['updateMetadata'],
    mutationFn: updateMetadata,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['metadata'] });
    },  
  });
}