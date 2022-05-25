export function isString(data: string | string[]): data is string {
  return typeof data === 'string';
}

export function getBarX(value: number, width: number, isSentiment = false) {
  if (!isSentiment) {
    return 0;
  }
  const midpoint = width / 2;
  if (value < 0) {
    return midpoint - midpoint * Math.abs(value);
  } else {
    return midpoint;
  }
}
