export const ROUTES = {
  home: "/",
  homeAlt: "/home",
  about: "/about",
  experience: "/experience",
  process: "/process",
  services: "/services",
  contact: "/contact",
} as const;

export const PATH_TO_SECTION: Record<string, string> = {
  [ROUTES.home]: "hero",
  [ROUTES.homeAlt]: "hero",
  [ROUTES.about]: "about",
  [ROUTES.experience]: "experience",
  [ROUTES.process]: "process",
  [ROUTES.services]: "services",
  [ROUTES.contact]: "contact",
};

export const FULL_VIEW_SECTIONS = new Set([
  "hero",
  "about",
  "experience",
  "process",
  "services",
  "contact",
]);

export function isHomePath(pathname: string): boolean {
  return pathname === "/" || pathname === "/home" || pathname === "";
}

export function getSectionIdFromPath(pathname: string): string {
  if (isHomePath(pathname)) return "hero";
  return PATH_TO_SECTION[pathname] ?? "hero";
}
