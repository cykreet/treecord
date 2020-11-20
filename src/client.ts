import { Client } from "discord-rpc";
import TeamTrees, { Badges } from "./classes/TeamTrees";

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

async function updateActivity(start: Date, teamtrees: TeamTrees) {
  const trees = await teamtrees.totalTrees();
  const donation = await teamtrees.recentDonation(BADGES);

  if (donation) {
    client.setActivity({
      details: `${trees} trees planted`,
      largeImageKey: donation.badge,
      largeImageText: `${donation.name} planted ${donation.trees} tree${donation.trees > 1 ? "s" : ""}!`,
      smallImageKey: "icon",
      smallImageText: donation.message ?? "#teamtrees",
      startTimestamp: start,
    });

    teamtrees.clear();
  }

  const timeout = !!process.env.TIMEOUT ? +process.env.TIMEOUT : 15000; // 15s
  setTimeout(() => updateActivity(start, teamtrees), timeout);
}

client.once("ready", () => {
  const teamtrees = new TeamTrees(TEAMTREES_URL);
  const start = new Date();

  updateActivity(start, teamtrees);
});

export default client;
