export default () => ({
  port: parseInt(process.env.PORT || '3000', 10),
  mongoUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtAccessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION || '1h',
  jwtRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION || '7d',
  rabbitmqUrl: process.env.RABBITMQ_URL,
  rabbitmqAuthQueue: process.env.RABBITMQ_AUTH_QUEUE,
  rabbitmqUserCreatedExchange: process.env.RABBITMQ_USER_CREATED_EXCHANGE,
  rabbitmqUserCreatedRoutingKey: process.env.RABBITMQ_USER_CREATED_ROUTING_KEY,
});
