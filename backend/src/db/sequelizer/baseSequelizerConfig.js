import { getEnvVar } from '../../utils/getEnvVar.js';

const dbHost = getEnvVar('DB_HOST');
const dbUser = getEnvVar('DB_USER');
const dbPort = Number(getEnvVar('DB_PORT'));
const dbDialect = getEnvVar('DB_CONNECTION', 'postgres');
const dbPassword = getEnvVar('DB_PASSWORD');
const dbName = getEnvVar('DB_NAME');

export const baseConfig = {
  dialect: dbDialect,
  username: dbUser,
  port: dbPort,
  host: dbHost,
  password: dbPassword,
  database: dbName,
};
