/**
 * Generate random string.
 * @param length Desired length of the string.
 * @returns {string} The randomly generated string.
 */
export function randomString(length: number) {
  let result: string = '';
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++)
    result += characters.charAt(Math.floor(Math.random() * characters.length));

  return result;
}
