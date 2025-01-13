import bcrypt from 'bcrypt';
import { Credentials } from '../interfaces/password.interface';

export const hashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

export const verifyPassword = async (password: string, hashPassword: string): Promise<boolean> => {
  return await bcrypt.compare(password, hashPassword);
};

export const hashPasswordFromObject = async (objectCredentials: Credentials, passwordKey: string): Promise<Credentials> => {
  const updatedObjectCredentials = { ...objectCredentials };

  if (updatedObjectCredentials[passwordKey]) {
    updatedObjectCredentials[passwordKey] = await hashPassword(updatedObjectCredentials[passwordKey]);
  }

  return updatedObjectCredentials;
};