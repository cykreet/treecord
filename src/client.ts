import { Client } from "discord-rpc";
import { failed } from "./";
import TeamTrees, { Badges } from "./classes/TeamTrees";
import { truncateString } from "./util";

const TEAMTREES_URL = "https://teamtrees.org";
const BADGES: Badges = {
  20: "badge-acorn",
  50: "badge-leaf",
  100: "badge-branch",
  250: "badge-grove",
  1000: "badge-mountain",
  0: "badge-earth",
};

export let currentTimeout: NodeJS.Timeout;
const client = new Client({ transport: "ipc" });

async function updateActivity(start: Date, teamtrees: TeamTrees) {
  const trees = await teamtrees.totalTrees();
  const donation = await teamtrees.recentDonation();
  if (donation) {
    client.setActivity({
      details: `${trees.toLocaleString()} trees planted`,
      state: "$1 plants a tree",
      largeImageKey: donation.badge,
      largeImageText: `${truncateString(donation.name, 50)} planted ${donation.trees.toLocaleString()} tree${
        donation.trees > 1 ? "s" : ""
      }!`,
      smallImageKey: "icon",
      smallImageText: donation.message?.length > 2 ? truncateString(donation.message, 40) : "teamtrees.org",
      startTimestamp: start,
    });

    teamtrees.clear();
  }

  const timeout = !!process.env.TIMEOUT ? +process.env.TIMEOUT : 15000; // 15s
  if (!failed) currentTimeout = setTimeout(() => updateActivity(start, teamtrees), timeout);
}

client.once("ready", () => {
  const start = new Date();
  const teamtrees = new TeamTrees(TEAMTREES_URL, BADGES);

  updateActivity(start, teamtrees);
});

export default client;
