import { Logger } from "@treecord/common";
import { API_HOST, RECENT_DONATIONS_ENDPOINT, TOP_DONATIONS_ENDPOINT, TOTAL_TREES_ENDPOINT } from "../constants";
import { treecord } from "../types";
import fetch from "node-fetch";

export class Treecord {
  private readonly host: string;
  private readonly logger: Logger;

  constructor(options: treecord.Options) {
    this.host = options.host ?? API_HOST;
    this.logger = options.logger ?? new Logger({ name: Treecord.name });
  }

  public async getTotalTrees(): Promise<treecord.Trees> {
    this.logger.debug("Fetching total trees.");
    const prefixedEnpoint = this.getPrefixedEndpoint(TOTAL_TREES_ENDPOINT);
    const response = await fetch(prefixedEnpoint);
    if (!response.ok) this.logger.error(new Error("Failed to reach total trees endpoint."));
    const trees: treecord.Trees = await response.json();
    return trees;
  }

  public async getRecentDonations(): Promise<treecord.Donation[]> {
    this.logger.debug("Fetching recent donations.");
    const prefixedEnpoint = this.getPrefixedEndpoint(RECENT_DONATIONS_ENDPOINT);
    const response = await fetch(prefixedEnpoint);
    if (!response.ok) this.logger.error(new Error("Failed to reach recent donations endpoint."));
    const donations: treecord.Donation[] = await response.json();
    return donations;
  }

  public async getTopDonations(): Promise<treecord.Donation[]> {
    this.logger.debug("Fetching top donations.");
    const prefixedEnpoint = this.getPrefixedEndpoint(TOP_DONATIONS_ENDPOINT);
    const response = await fetch(prefixedEnpoint);
    if (!response.ok) this.logger.error(new Error("Failed to reach top donations endpoint."));
    const donations: treecord.Donation[] = await response.json();
    return donations;
  }

  private getPrefixedEndpoint(endpoint: string) {
    return `${this.host}${endpoint}`;
  }
}
