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

export default class TeamTrees {
  protected readonly url: string;
  protected data: cheerio.Root;
  protected latest: Date;

  constructor(url: string) {
    this.url = url;
  }

  private async fetch() {
    this.data = await got(this.url, { resolveBodyOnly: true }).then((r) => cheerio.load(r));
  }

  async recentDonation(badges: Badges): Promise<Donation> {
    if (!this.data) await this.fetch();
    const $ = this.data;

    const recent = $("#recent-donations").children().first();
    const created = new Date(recent.find(".feed-datetime").text());
    if (this.latest >= this.latest) return;

    const name = recent.find(".text-spruce").first();
    const badge = recent.find(".badge");
    const trees = parseInt(badge.text());
    // todo: fix
    const gift = !!badge.remove("#text").last();
    const message = name.next().text();

    let treeBadge: string;
    for (const [key, value] of Object.entries(badges).sort(([a], [b]) => +b - +a)) {
      // todo: default case
      if (trees < +key) treeBadge = value;
    }

    const donation: Donation = {
      name: name.text().trim(),
      message: message[0] ? message.trim() : undefined,
      badge: treeBadge,
      trees,
      gift,
    };

    this.latest = created;
    return donation;
  }

  async totalTrees(): Promise<number> {
    if (!this.data) await this.fetch();
    const $ = this.data;

    return +$("#totalTrees").attr("data-count");
  }

  clear() {
    this.data = undefined;
  }
}
