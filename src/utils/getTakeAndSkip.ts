export function getTakeAndSkip(page: string | number, limit: string) {
  const pageInt = parseInt(page.toString());
  const take = parseInt(limit) || 10;
  const skip = pageInt <= 1 ? 0 : take * (pageInt - 1);
  return { take, skip };
}
