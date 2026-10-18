export function cn(...names: Array<string | false | null | undefined>): string {
  return names.filter(isClass).join(" ");
}

function isClass(name: string | false | null | undefined): name is string {
  return typeof name === "string" && name.length > 0;
}
