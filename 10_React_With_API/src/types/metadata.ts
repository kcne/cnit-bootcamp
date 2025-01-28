export interface Metadata {
  id: number;
  apiVersion: number;
  apiName: string;
  clients: AppClient[];
}

export interface AppClient {
  id: number;
  name: string;
  browser: string;
  metadataId: number;
}

export interface CreateAppClient{
  name:string;
  browser:string;
}