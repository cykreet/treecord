import axios from 'axios';
import cheerio from 'cheerio';

import { randomString } from './util';

const matchSecret = randomString(30);
const spectateSecret = randomString(30);
const startTime = Date.now();

export async function teamTreesRPC() {
  const donator = await getRecentDonation();
  const totalTrees = await getTreeStats();

  return {
    details: `${totalTrees.total.toLocaleString('en')} trees planted`,
    state: `${totalTrees.progress} | ${totalTrees.percentage}%`,
    largeImageKey: getBadge(donator.trees),
    largeImageText: `${
      donator.name.length > 105
        ? `${donator.name.substr(0, 102)}...`
        : donator.name
    } planted ${donator.trees} tree${donator.trees > 1 ? 's' : ''}!`,
    smallImageKey: 'smallicon',
    smallImageText:
      donator.message !== null && donator.message.length >= 2
        ? donator.message
        : '#teamtrees',
    startTimestamp: startTime,
    instance: 0,
    matchSecret: matchSecret,
    spectateSecret: spectateSecret,
  };
}

/**
 * Fetch data from teamtrees.org.
 */
async function fetchData() {
  return await axios
    .get('https://teamtrees.org/')
    .then(r => cheerio.load(r.data));
}

/**
 * Gets the total trees planted at teamtrees.org
 */
async function getTreeStats() {
  const $ = await fetchData();

  const trees = parseInt($('.counter').attr('data-count'));
  const complete = Math.trunc(Math.floor((trees / 200000) * 1000) / 1000);

  const chars = {
    blank: '-',
    filled: '#',
  };

  const filled =
    parseInt((complete / 10).toString(), 10) >= 10
      ? 10
      : parseInt((complete / 10).toString(), 10);

  return {
    total: trees,
    percentage: complete,
    progress:
      '[' + chars.filled.repeat(filled) + chars.blank.repeat(10 - filled) + ']',
  };
}

/**
 * Gets the most recent donation at teamtrees.org
 */
async function getRecentDonation() {
  const $ = await fetchData();
  const recent = $('#recent-donations')
    .children()
    .first()
    .html();

  return {
    name: $(recent)
      .find('strong')
      .text()
      .trim(),
    trees: parseInt(
      $(recent)
        .find('.feed-tree-count')
        .text()
        .replace('trees', '')
    ),
    message: $(recent)
      .find('.medium')
      .text()
      ? $(recent)
          .find('.medium')
          .text()
      : null,
  };
}

/**
 * Get the corresponding teamtrees badge for the amount of trees provided.
 * @param trees Amount of trees to get badge for.
 * @returns {string} The badge image key from the application's RPC assets.
 */
function getBadge(trees: number) {
  if (trees < 20) {
    return 'badge-1';
  } else if (trees < 50) {
    return 'badge-2';
  } else if (trees < 100) {
    return 'badge-3';
  } else if (trees < 250) {
    return 'badge-4';
  } else if (trees < 1000) {
    return 'badge-5';
  }

  return 'badge-6';
}
