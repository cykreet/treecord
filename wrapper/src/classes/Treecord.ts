import { Logger } from "tslog";
import { API_HOST, Endpoints } from "../constants";
import { fetchEndpoint } from "../helpers/fetchEndpoint";
import { treecord } from "../types";

export class Treecord {
  private readonly host: string;
  private readonly logger?: Logger;

  constructor(options: treecord.Options) {
    this.host = options.host ?? API_HOST;
    this.logger = options.logger;
  }

  public async getTotalTrees(): Promise<treecord.Trees> {
    this.logger?.debug("Fetching total trees.");
    const response = await fetchEndpoint(this.host, Endpoints.TOTAL_TREES);
    const trees: treecord.Trees = await response.json();
    return trees;
  }

  public async getRecentDonations(limit: number): Promise<treecord.Donation[]> {
    this.logger?.debug("Fetching recent donations.");
    const params = new URLSearchParams();
    if (limit) params.set("limit", limit.toString());

    const response = await fetchEndpoint(this.host, Endpoints.RECENT_DONATIONS, { body: params });
    const donations: treecord.Donation[] = await response.json();
    return donations;
  }

  public async getTopDonations(limit: number): Promise<treecord.Donation[]> {
    this.logger?.debug("Fetching top donations.");
    const params = new URLSearchParams();
    if (limit) params.set("limit", limit.toString());

    const response = await fetchEndpoint(this.host, Endpoints.TOP_DONATIONS, { body: params });
    const donations: treecord.Donation[] = await response.json();
    return donations;
  }
}
