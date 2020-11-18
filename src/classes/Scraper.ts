import * as cheerio from "cheerio";
import got from "got";

export interface Donation {
  name: string;
  trees: number;
  badge: string;
  gift: boolean;
  message?: string;
}

export interface Badges {
  [key: number]: string;
}

export default class Scraper {
  private readonly url: string;
  private data: cheerio.Root;
  private mostRecentDonation: Donation;

  constructor(url: string) {
    this.url = url;
  }

  private async fetch() {
    this.data = await got(this.url, { resolveBodyOnly: true }).then((r) =>
      cheerio.load(r)
    );
  }

  async recentDonation(badges: Badges): Promise<Donation> {
    if (!this.data) await this.fetch();
    const $ = this.data;

    const recent = $("#recent-donations").children().first();
    const name = recent.find(".text-spruce").first();
    const badge = recent.find(".badge");
    const trees = parseInt(badge.text());
    const gift = !!badge.remove("#text").last(); // not tested
    const message = name.next().text();

    let treeBadge: string;
    for (const [key, value] of Object.entries(badges).sort(([a], [b]) => +b - +a)) {
      const count = +key;
      // todo: default case
      if (trees < count) treeBadge = value;
    }

    const donation: Donation = {
      name: name.text().trim(),
      trees,
      badge: treeBadge,
      message: message[0] ? message.trim() : undefined,
      gift,
    };

    if (
      this.mostRecentDonation &&
      JSON.stringify(this.mostRecentDonation) === JSON.stringify(donation)
    )
      return;

    this.mostRecentDonation = donation;
    return donation;
  }

  async totalTrees(): Promise<number> {
    if (!this.data) await this.fetch();
    const $ = this.data;

    return +$("#totalTrees").attr("data-count");
  }
}
