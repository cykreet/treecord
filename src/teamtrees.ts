import axios from "axios";
import * as cheerio from "cheerio";
import { Util } from "./util";

const util = new Util();
const startTime = Date.now();

interface IDonation {
  name: string;
  trees: number;
  message: string | null;
}

interface ITotal {
  total: number;
  complete: number;
  progress: string;
}

interface IRPC {
  details: string;
  state: string;
  largeImageKey: string;
  largeImageText: string;
  smallImageKey: string;
  smallImageText: string;
  startTimestamp: number;
  instance: number | boolean;
  matchSecret: string;
  spectateSecret: string;
}

export async function teamTreesRPC() {
  const donator = await getRecentDonation();
  const totalTrees = await getTreeStats();

  let rpc: IRPC;

  return (rpc = {
    details: `${util.formatNum(totalTrees.total)} trees planted`,
    state: `${totalTrees.progress} | ${totalTrees.complete}%`,
    largeImageKey: util.getBadge(donator.trees),
    largeImageText: `${
      donator.name.length > 20
        ? `${donator.name.substr(0, 12)}...`
        : donator.name
    } planted ${donator.trees} tree${donator.trees > 1 ? "s" : ""}!`,
    smallImageKey: "smallicon",
    smallImageText:
      donator.message !== null && donator.message.length >= 2
        ? donator.message
        : "#teamtrees",
    startTimestamp: startTime,
    instance: 0,
    matchSecret: util.randomString(30),
    spectateSecret: util.randomString(30)
  });
}

/**
 * Fetch data from teamtrees.org.
 * @returns {Promise<AxiosResponse>} teamtrees.org data.
 */
async function fetchData() {
  const result = await axios.get("https://teamtrees.org");

  return cheerio.load(result.data);
}

/**
 * Gets the total trees planted at teamtrees.org
 * @returns {Promise<ITotal>} Total amount of trees as well as percentage planted and a little progress bar.
 */
async function getTreeStats() {
  const $ = await fetchData();

  const trees = parseInt($(".counter").attr("data-count"));
  const complete = Math.trunc(Math.floor((trees / 200000) * 1000) / 1000);

  let progress;
  if (complete < 10) {
    progress = "----------";
  } else if (complete < 20) {
    progress = "#---------";
  } else if (complete < 30) {
    progress = "##--------";
  } else if (complete < 40) {
    progress = "###-------";
  } else if (complete < 50) {
    progress = "####------";
  } else if (complete < 60) {
    progress = "#####-----";
  } else if (complete < 70) {
    progress = "######----";
  } else if (complete < 80) {
    progress = "#######---";
  } else if (complete < 90) {
    progress = "########--";
  } else if (complete < 100) {
    progress = "#########-";
  } else {
    progress = "##########";
  }

  const result: ITotal = {
    total: trees,
    complete: complete,
    progress: "[" + progress + "]"
  };

  return result;
}

/**
 * Gets the most recent donation at teamtrees.org
 * @returns {Promise<IDonation>} Name, amount of trees planted and message of the most recent donation.
 */
async function getRecentDonation() {
  const $ = await fetchData();
  const recent = $("#recent-donations")
    .children()
    .first()
    .html();

  const result: IDonation = {
    name: $(recent)
      .find("strong")
      .text()
      .trim(),
    trees: parseInt(
      $(recent)
        .find(".feed-tree-count")
        .text()
        .replace("trees", "")
    ),
    message: $(recent)
      .find(".medium")
      .text()
      ? $(recent)
          .find(".medium")
          .text()
      : null
  };

  return result;
}
