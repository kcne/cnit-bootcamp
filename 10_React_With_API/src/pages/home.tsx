import { Button } from "@/components/ui/button";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

async function fetchMetadata() {
  const res = await axios.get('http://localhost:3000/api/metadata');
  return res.data;
}

async function updateMetadata(body:{name:string, description:string}) {
  return axios.post('http://localhost:3000/api/metadata', body).then((res) => res.data);
}

function Home() {

  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['metadata'],
    queryFn: fetchMetadata,
  });

  const mutation = useMutation({
    mutationFn: updateMetadata,
    mutationKey: ['updateMetadata'],
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ['metadata'] });
    },
  });

  const postMetadata  = async() => {
    const body = {name:"CentarNit App", description:"New Description"}
    await mutation.mutateAsync(body);
  }

  return (
    <div className="w-page h-page flex items-center justify-center">
      {isLoading && <div>Loading....</div>}
      {isError && <div>Error fetching data....</div>}
      {data && (
        <div>
          <ul>
            {Object.entries(data).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong>{" "}
                {typeof value === "object" && value !== null ? JSON.stringify(value) : String(value)}
              </li>
            ))}
          </ul>
        </div>
      )}
      <Button onClick = {postMetadata}>Mutate Data</Button>
    </div>
  )
}

export default Home