import { Logger } from "tslog";
import { API_HOST, Endpoint } from "../constants";
import { fetchEndpoint } from "../helpers/fetchEndpoint";
import { treecord } from "../types";

export class Treecord {
  private readonly host: string;
  private readonly logger?: Logger;

  constructor(options: treecord.Options) {
    this.host = options.host ?? API_HOST;
    this.logger = options.logger;
  }

  public async getTotalTrees(): Promise<number> {
    this.logger?.debug("Fetching total trees.");
    const response = await fetchEndpoint(this.host, Endpoint.TOTAL_TREES);
    const body = await response.json();
    return +body;
  }

  public async getRecentDonations(limit: number): Promise<treecord.Donation[]> {
    this.logger?.debug("Fetching recent donations.");
    return this.fetchDonations(Endpoint.TOP_DONATIONS, {
      name: "limit",
      value: limit,
    });
  }

  public async getTopDonations(limit: number): Promise<treecord.Donation[]> {
    this.logger?.debug("Fetching top donations.");
    return this.fetchDonations(Endpoint.TOP_DONATIONS, {
      name: "limit",
      value: limit,
    });
  }

  private async fetchDonations(endpoint: string, ...params: { name: string; value: any }[]): Promise<treecord.Donation[]> {
    const searchParams = new URLSearchParams();
    params.forEach((p) => searchParams.append(p.name, p.value));

    const response = await fetchEndpoint(this.host, endpoint, { body: searchParams });
    const body = await response.json();
    return body as treecord.Donation[];
  }
}
