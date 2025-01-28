import { useUpdateMetadata } from "@/api/mutations/update-metadata";
import { useMetadata } from "@/api/queries/get-metadata";
import { Button } from "@/components/ui/button";


function Home() {

  const {data, isLoading, isError} = useMetadata();

  const { mutateAsync:addClient}  = useUpdateMetadata();

  const postMetadata = async () => {
    const body = { name: `Task Manager - React Vite App ${String(Math.floor(Math.random() * 1000) + 1)}`, browser: navigator.userAgent };
    await addClient(body);
  };

  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-50">
      <div className="p-6 bg-white rounded-lg shadow-md">
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error fetching data...</div>}
        {data ? (
          <div>
            <h1 className="text-lg font-semibold mb-4">Metadata</h1>
            <ul className="space-y-2">
              <li>
                <strong>API Name:</strong> {data.apiName} <br />
                <strong>API Version:</strong> {data.apiVersion} <br />
                <strong>Clients:</strong>
                <ul className="pl-4">
                  {data.clients.map((client) => (
                    <li key={client.id}>
                      {client.name} ({client.browser})
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </div>
        ) : (
          <div>No metadata available</div>
        )}
        <Button onClick={postMetadata} className="mt-4">
          Update Metadata
        </Button>
      </div>
    </div>
  );
}

export default Home
