import { Metadata } from "@/types/metadata";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

async function fetchMetadata(): Promise<Metadata> {
  const res = await axios.get<Metadata>('http://localhost:3000/api/metadata');
  return res.data;
}

export function useMetadata(){
  return useQuery<Metadata>({
    queryKey: ['metadata'],
    queryFn: fetchMetadata,
  });


}
