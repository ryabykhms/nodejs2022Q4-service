import { compare } from 'bcrypt';

export const verifyPassword = (
  text: string,
  hash: string,
): Promise<boolean> => {
  return compare(text, hash);
};
