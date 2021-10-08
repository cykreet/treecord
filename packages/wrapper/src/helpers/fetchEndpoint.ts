import { request } from "undici";
import { Endpoint } from "../constants";

export type SearchParam = { name: string; value: any };
type Options = Parameters<typeof request>[1] & { searchParams?: SearchParam[] };

export async function fetchEndpoint(host: string, endpoint: Endpoint, options?: Options) {
  const fullEndpoint = new URL(endpoint, host);
  const searchParams = options?.searchParams;
  if (searchParams) {
    searchParams.forEach((p) => fullEndpoint.searchParams.append(p.name, p.value));
  }

  const response = await request(fullEndpoint, options);
  if (response.statusCode !== 200) throw new Error(`Failed to retreive "${endpoint}" data.`);
  return response.body.json();
}
