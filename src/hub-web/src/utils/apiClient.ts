import { client } from "@client/client.gen";

// configure api client
export const configureApiClient = (baseUrl: string) => {
  client.setConfig({
    baseUrl: baseUrl
  });
}