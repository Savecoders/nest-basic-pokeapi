export const EnvConfiguration = () => ({
  enviroment: process.env.NODE_ENV || 'development',
  mongodb: process.env.MONGODB,
  port: parseInt(process.env.PORT) || 3002,
  defaultLimit: process.env.DEFAULT_LIMIT || 2,
});
