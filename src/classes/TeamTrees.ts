import * as cheerio from "cheerio";
import got from "got";

export interface Donation {
  name: string;
  trees: number;
  badge: string;
  message?: string;
}

export interface Badges {
  [key: number]: string;
}

export default class TeamTrees {
  private readonly url: string;
  private data: cheerio.Root;
  private latest: Date;
  private badges: [string, string][];

  constructor(url: string, badges: Badges) {
    this.url = url;
    this.badges = this.cleanBadges(badges);
  }

  private async fetch() {
    this.data = await got(this.url, { resolveBodyOnly: true }).then((r) => cheerio.load(r));
  }

  async recentDonation(): Promise<Donation> {
    if (!this.data) await this.fetch();
    const $ = this.data;

    const recent = $("#recent-donations").children().first();
    // ideally we'd scrape the donation dates and
    // compare them, but that seems like a lot more work :)
    const date = new Date();
    if (this.latest >= date) return;

    const name = recent.find(".text-spruce").first();
    const badge = recent.find(".badge");
    const trees = parseInt(badge.text());
    const message = name.next().text();

    let treeBadge: string;
    for (const [key, value] of this.badges) {
      if (trees < +key) {
        treeBadge = value;
        continue;
      }

      if (!treeBadge) treeBadge = value;
    }

    return {
      name: name.text().trim(),
      message: message[0] ? message.trim() : undefined,
      badge: treeBadge,
      trees,
    };
  }

  async totalTrees(): Promise<number> {
    if (!this.data) await this.fetch();
    const $ = this.data;

    return +$("#totalTrees").attr("data-count");
  }

  private cleanBadges(badges: Badges) {
    return Object.entries(badges).sort(([a], [b]) => +b - +a);
  }

  clear() {
    this.data = undefined;
  }
}
