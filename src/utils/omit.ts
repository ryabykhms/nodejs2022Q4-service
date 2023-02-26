export const omit = <T extends object, K extends string[]>(
  object: T | null | undefined,
  ...paths: K
): Pick<T, Exclude<keyof T, K[number]>> => {
  if (!object) {
    return object;
  }

  const objectCopy = { ...object };

  for (const path of paths) {
    delete objectCopy[path];
  }

  return objectCopy;
};
