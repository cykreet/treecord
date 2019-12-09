export class Util {
  /**
   * Generate a random piece of string.
   * @param length Amount of characters the string should be.
   * @returns {string} The randomly generated string.
   */
  public randomString(length: number) {
    let result: string = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < length; i++)
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );

    return result;
  }

  /**
   * Formats a number to include thousand separators.
   * @param num The number to format.
   * @returns {string} The formatted number with thousand separators.
   */
  public formatNum(num: number) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  /**
   * Get the corresponding teamtrees badge for the amount of trees provided.
   * @param trees Amount of trees to get badge for.
   * @returns {string} The badge image key from the application's RPC assets.
   */
  public getBadge(trees: number) {
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
}
