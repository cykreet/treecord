import * as path from "path";

import * as RPC from "discord-rpc";
import { Util } from "./util";

require("dotenv").config({ path: path.resolve(process.cwd(), ".env") });

const util = new Util();
const client = new RPC.Client({ "transport": "ipc" });
const clientId = process.env.CLIENTID;

if (!clientId) throw new Error("CLIENTID was not detected. Please include it in .env");

const startTime = Date.now();

async function teamtrees() {
    const donator = await util.getRecentDonation();
    const totalTrees = await util.getTreeStats();

    try {
        client.setActivity({
            "details": `${totalTrees.total >= 20000000 ?  "🎉 " + util.formatNum(totalTrees.total) : util.formatNum(totalTrees.total)} trees planted`,
            "state": `${totalTrees.progress} | ${totalTrees.complete}%`,
            "largeImageKey": util.getBadge(donator.trees),
            "largeImageText": `${donator.name.length > 20 ? `${donator.name.substr(0, 12)}...` : donator.name} planted ${donator.trees} tree${donator.trees > 1 ? "s" : ""}!`,
            "smallImageKey": "smallicon",
            "smallImageText": donator.message !== null && donator.message.length >= 2 ? donator.message : "#teamtrees",
            "startTimestamp" : startTime,
            "instance": 0,
            "matchSecret": util.genHash(30),
            "spectateSecret": util.genHash(30),
        });
    } catch (e) {
        console.error(e);
    }
}

client.on("ready", () => {
    console.log(`discord-tt v${require(path.resolve(process.cwd(), "package.json")).version}\nConnected to Discord.`);

    setInterval(teamtrees, 1000 * 10);
});

client.login({ clientId });