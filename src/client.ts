import { Client } from "discord-rpc";
import Scraper, { Badges } from "./classes/Scraper";

const TEAMTREES_URL = "https://teamtrees.org";
const BADGES: Badges = {
  20: "badge-acorn",
  50: "badge-leaf",
  100: "badge-branch",
  250: "badge-grove",
  1000: "badge-mountain",
  0: "badge-earth",
};

const client = new Client({ transport: "ipc" });

async function updateActivity(start: Date, scraper: Scraper) {
  const trees = await scraper.totalTrees();
  const donation = await scraper.recentDonation(BADGES);

  if (donation) {
    client.setActivity({
      details: `${trees} trees planted`,
      largeImageKey: donation.badge,
      largeImageText: `${donation.name} planted ${donation.trees} tree${
        donation.trees > 1 ? "s" : ""
      }!`,
      smallImageKey: "icon",
      smallImageText: donation.message ?? "#teamtrees",
      startTimestamp: start,
    });
  }

  const timeout = !!process.env.TIMEOUT ? +process.env.TIMEOUT : 15000; // 15s
  setTimeout(updateActivity, timeout);
}

client.once("ready", () => {
  const scraper = new Scraper(TEAMTREES_URL);
  const start = new Date();

  updateActivity(start, scraper);
});

export default client;
