// Filter out classname accoriding to params
export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}
