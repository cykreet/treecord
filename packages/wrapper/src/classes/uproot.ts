import { Logger } from "tslog";
import { Donation, Options } from "..";
import { API_HOST, Endpoint } from "../constants";
import { fetchEndpoint, SearchParam } from "../helpers/fetchEndpoint";

export class Uproot {
  private readonly host = API_HOST;
  private readonly logger?: Logger;

  constructor(options?: Options) {
    this.logger = options?.logger;
  }

  public async getTotalTrees(): Promise<number> {
    this.logger?.debug("Fetching total trees.");
    const body = await fetchEndpoint(this.host, Endpoint.TOTAL_TREES);
    return body as number;
  }

  public async getRecentDonations(limit?: number): Promise<Donation[]> {
    this.logger?.debug("Fetching recent donations.");
    return this.fetchDonations(Endpoint.RECENT_DONATIONS, {
      name: "limit",
      value: limit,
    });
  }

  public async getTopDonations(limit?: number): Promise<Donation[]> {
    this.logger?.debug("Fetching top donations.");
    return this.fetchDonations(Endpoint.TOP_DONATIONS, {
      name: "limit",
      value: limit,
    });
  }

  private async fetchDonations(endpoint: Endpoint, ...searchParams: SearchParam[]): Promise<Donation[]> {
    const body = await fetchEndpoint(this.host, endpoint, { method: "GET", searchParams });
    return body as Donation[];
  }
}
