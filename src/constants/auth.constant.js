export const HASH_SALT_ROUNDS = 10;
export const MIN_PASSWORD_LENGTH = 6;
export const MIN_PHONE_LENGTH = 10;
export const MAX_PHONE_LENGTH = 11;
export const ACCESS_TOKEN_EXPIRES_IN = '10m';
export const REFRESH_TOKEN_EXPIRES_IN = '1d';
export const refreshTokens = {};

export function setRefreshToken(id, data) {
  refreshTokens[id] = data;
}

export function clearRefreshToken(id) {
  delete refreshTokens[String(id)];
}
