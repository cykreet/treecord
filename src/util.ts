export function truncateString(input: string, maxLength: number): string {
  if (input.length < maxLength && input.endsWith(".")) return input;
  if (input.length > maxLength) input = `${input.substring(0, maxLength - 3)}...`;
  return input;
}
