import { Injectable } from "@nestjs/common";
import { DataService } from "../data";
import { APIDonation } from "./donations.types";

@Injectable()
export class DonationsService {
  constructor(private dataService: DataService) {}

  public async getRecentDonations(limit: number = 5): Promise<APIDonation[]> {
    const $ = await this.dataService.loadBody();
    const recentDonations = $("#recent-donations").children();
    let donations: APIDonation[] = [];
    recentDonations.each((i, element) => {
      // breaks out of the loop
      if (i >= limit) return false;
      const name = $(element).find(".text-spruce");
      const team = $(element).find(".text-lightMoss").text();
      const badge = $(element).find(".badge");
      const trees = this.cleanTrees(badge.text());
      const message = name.next().text();
      const donatedAt = $(element).find(".feed-datetime").text();

      donations.push({
        user: {
          name: name.text().trim(),
          team: team[0] ? team.trim() : null,
        },
        trees: +trees,
        message: message[0] ? message.trim() : null,
        donatedAt: new Date(donatedAt),
        gift: false, // todo: pita
      });
    });

    return donations;
  }

  public async getTopDonations(limit: number = 5): Promise<APIDonation[]> {
    const $ = await this.dataService.loadBody();
    const topDonations = $("#top-donations").children();
    let donations: APIDonation[] = [];
    topDonations.each((i, element) => {
      if (i >= limit) return false;
      const name = $(element).find(".leader-card__name").text();
      const team = $(element).find(".leader-card__team").text();
      const trees = $(element).attr("data-trees-top")!;
      const message = $(element).find(".leader-card__message").text();
      const donatedAt = $(element).find(".leader-card__date").text();

      donations.push({
        user: {
          name: name.trim(),
          team: team[0] ? team.trim() : null,
        },
        trees: +trees,
        message: message[0] ? message.trim() : null,
        donatedAt: new Date(donatedAt),
        // as far as im aware there has never been a top, gifted donation
        // so something to look for in the future
        gift: false,
      });
    });

    return donations;
  }

  private cleanTrees(input: string) {
    return input.replace("trees", "");
  }
}
