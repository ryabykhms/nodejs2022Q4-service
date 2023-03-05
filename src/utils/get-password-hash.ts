import { hash } from 'bcrypt';
import { config } from 'dotenv';

config();

const salt = Number.parseInt(process.env.CRYPT_SALT || '10', 10);

export const getPasswordHash = async (text: string): Promise<string> => {
  return hash(text, salt);
};
