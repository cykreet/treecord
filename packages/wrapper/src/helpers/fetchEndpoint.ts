import got, { OptionsOfJSONResponseBody } from "got";
import { Endpoint } from "../constants";

export async function fetchEndpoint(host: string, endpoint: Endpoint, options?: OptionsOfJSONResponseBody) {
  const fullEndpoint = `${host}/${endpoint}`;
  const request = got(fullEndpoint, options);
  const data = request.json();
  const response = await request;
  if (response.statusCode !== 200) throw new Error(`Failed to retreive "${endpoint}" data.`);
  return data;
}
