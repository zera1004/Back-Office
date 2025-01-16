import redisClient from '../../redis';

const USER_KEY_PREFIX = 'redis-';

export const HASH_SALT_ROUNDS = 10;
export const MIN_PASSWORD_LENGTH = 6;
export const MIN_PHONE_LENGTH = 10;
export const MAX_PHONE_LENGTH = 11;
export const ACCESS_TOKEN_EXPIRES_IN = '10m';
export const REFRESH_TOKEN_EXPIRES_IN = '1d';
export const refreshTokens = {};

export const setRefreshToken = (id, data) => {
  redisClient.set(`${USER_KEY_PREFIX}${id}`, data);
};

export function clearRefreshToken(id) {
  delete refreshTokens[String(id)];
}
