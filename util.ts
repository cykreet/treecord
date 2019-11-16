import axios from "axios";
import * as cheerio from "cheerio";

interface IDonation {
    name: string,
    trees: number,
    message: string | null
}

interface ITotal {
    total: number,
    complete: number,
    progress: string
}

export class Util {
    /**
     * Generate a random piece of string.
     * @param length Amount of characters the string should be.
     * @returns {string} The randomly generated string.
     */
    public genHash(length: number) {
        let result: string;
        const characters = "abcdefghijklmnopqrstuvwxyz0123456789";

        for ( var i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }

        return result;
    } 

    /**
     * Restrict a value to a given range.
     * @param value The value to restrict.
     * @param min The minimum range value.
     * @param max The maximum range value.
     * @returns {number} The clamped value.
     */
    public clamp(value: number, min: number, max: number) {
        return Math.max(min, Math.min(max, value));
    }

    /**
     * Formats a number to include thousand separators.
     * @param num The number to format.
     * @returns {string} The formatted number with thousand separators.
     */
    public formatNum(num: number) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    /**
     * Fetch data from teamtrees.org.
     * @returns {Promise<AxiosResponse>} teamtrees.org data.
     */
    private async fetchData() {
        const result = await axios.get("https://teamtrees.org");

        return cheerio.load(result.data);
    }

    /**
     * Get the corresponding teamtrees badge for the amount of trees provided.
     * @param trees Amount of trees to get badge for.
     * @returns {string} The badge image key from the application's RPC assets.
     */
    public getBadge(trees: number) {
        if (trees < 20) {
            return "badge-1";
        } else if (trees < 50) {
            return "badge-2";
        } else if (trees < 100) {
            return "badge-3";
        } else if (trees < 250) {
            return "badge-4";
        } else if (trees < 1000) {
            return "badge-5";
        }
        
        return "badge-6";
    }

    /**
     * Gets the total trees planted at teamtrees.org
     * @returns {Promise<ITotal>} Total amount of trees as well as percentage planted and a little progress bar.
     */
    public async getTreeStats() {
        const $ = await this.fetchData();

        const trees = parseInt($(".counter").attr("data-count"));
        const complete = Math.trunc(Math.floor(trees/ 200000 * 1000) / 1000)

        let progress;
        if (complete < 10) { // nothing special, but good enough.
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

        try {
            const result: ITotal = {
                total: trees,
                complete: complete,
                progress: "[" + progress + "]"
            }
    
            return result;
        } catch {
            throw Error("Something went wrong in the attempt to get total trees.");
        }
    }
    
    /**
     * Gets the most recent donation at teamtrees.org
     * @returns {Promise<IDonation>} Name, amount of trees planted and message of the most recent donation.
     */
    public async getRecentDonation() {
        const $ = await this.fetchData();
        const recent = $("#recent-donations").children().first().html();

        try {
            const result: IDonation = {
                name: $(recent).find("strong").text().trim(),
                trees: parseInt($(recent).find(".feed-tree-count").text().replace("trees", "")),
                message: $(recent).find(".medium").text() ? $(recent).find(".medium").text() : null  
            }

            return result;
        } catch {
            throw Error("Something went wrong in the attempt to get the most recent donation.");
        }
    }
}