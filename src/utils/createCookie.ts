export function createCookie(token: string) {

  return `token=${token}; path=/; max-age=${86400 * 3}; secure; samesite=strict`;
}