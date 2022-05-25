export function isString(data: string | string[]): data is string {
  return typeof data === 'string';
}
