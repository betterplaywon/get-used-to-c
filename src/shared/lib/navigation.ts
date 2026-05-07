export function isNavActive(pathname: string, target: string): boolean {
  if (target === '/') return pathname === '/';
  return pathname === target || pathname.startsWith(`${target}/`);
}
