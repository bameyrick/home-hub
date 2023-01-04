export function removeParentUrlParts(parentUrl: string, childUrl: string): string {
  const parentParts = parentUrl.split('/');

  return childUrl
    .split('/')
    .filter((part, index) => part !== parentParts[index])
    .join('/');
}
