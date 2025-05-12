export default () => ({
  app: {
    port: parseInt(process.env.PORT || '3000', 10),
    environment: process.env.NODE_ENV || 'development',
  },
  database: {
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '3306', 10),
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'admin_backend',
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV !== 'production',
    ssl: process.env.NODE_ENV !== 'production',
  },
  security: {
    corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:3000',
    rateLimitTtl: parseInt(process.env.RATE_LIMIT_TTL || '60000', 10),
    rateLimitMax: parseInt(process.env.RATE_LIMIT_MAX || '60', 10),
  },
  logging: {
    level: process.env.LOG_LEVEL || 'debug',
  },
  nodeEnv: process.env.NODE_ENV || 'development',
});
