import fetch, { RequestInit } from "node-fetch";

export async function fetchEndpoint(host: string, endpoint: string, init?: RequestInit) {
  const fullEndpoint = `${host}/${endpoint}`;
  const response = await fetch(fullEndpoint, init);
  if (!response.ok) throw new Error(`Failed to retreive "${endpoint}" data.`);
  return response;
}
