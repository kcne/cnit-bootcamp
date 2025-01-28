import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import axios from "axios";

// Define TypeScript types
interface Metadata {
  id: number;
  apiVersion: number;
  apiName: string;
  clients: AppClient[];
}

interface AppClient {
  id: number;
  name: string;
  browser: string;
  metadataId: number;
}

interface CreateAppClient {
  name: string;
  browser: string;
}

async function fetchMetadata(): Promise<Metadata> {
  const res = await axios.get<Metadata>("http://localhost:3000/api/metadata");
  return res.data;
}

async function updateMetadata(data: CreateAppClient): Promise<Metadata> {
  const res = await axios.post<Metadata>(
    "http://localhost:3000/api/metadata",
    data
  );
  return res.data;
}

function Home() {
  const [data, setData] = useState<Metadata | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  // Fetch metadata
  const loadMetadata = async () => {
    setIsLoading(true);
    setIsError(false);
    try {
      const metadata = await fetchMetadata();
      setData(metadata);
    } catch (error) {
      console.error("Error fetching metadata:", error);
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  // Update metadata
  const postMetadata = async () => {
    const body = {
      name: `Task Manager - React Vite App ${
        Math.floor(Math.random() * 1000) + 1
      }`,
      browser: navigator.userAgent,
    };

    try {
      await updateMetadata(body);
      await loadMetadata(); // Refetch metadata after update
    } catch (error) {
      console.error("Error updating metadata:", error);
      setIsError(true);
    }
  };

  useEffect(() => {
    loadMetadata();
  }, []);

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

export default Home;
