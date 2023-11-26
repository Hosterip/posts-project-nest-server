import * as crypto from 'crypto';

export const genHashAndSalt = (password: string) => {
  const salt = crypto.randomBytes(32).toString('hex');
  const hash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return {
    hash,
    salt,
  };
};

export const validPassword = (password: string, salt: string, hash: string) => {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hashVerify === hash;
};
