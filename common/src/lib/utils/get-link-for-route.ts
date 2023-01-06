export function getLinkForRoute(route: string, params: Record<string, string | number | boolean>): string {
  let newRoute = `/${route}`;

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (newRoute.includes(`/:${key}`)) {
        newRoute = newRoute.replace(new RegExp(`/:${key}`), `/${value}`);
      } else {
        throw new Error(`Paramater "${key}" does not exist in the path "${route}"`);
      }
    });
  }

  return newRoute;
}
