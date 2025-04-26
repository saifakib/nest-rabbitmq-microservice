export default () => ({
    port: parseInt(process.env.PORT || '3000', 10),
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/auth_db',
    jwtSecret: process.env.JWT_SECRET || 'secret-key',
    jwtAccessTokenExpiration: process.env.JWT_ACCESS_TOKEN_EXPIRATION || '1h',
    jwtRefreshTokenExpiration: process.env.JWT_REFRESH_TOKEN_EXPIRATION || '7d',
    rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    rabbitmqAuthQueue: process.env.RABBITMQ_AUTH_QUEUE || 'auth.rpc.requests',
    rabbitmqUserCreatedExchange: process.env.RABBITMQ_USER_CREATED_EXCHANGE || 'user.events',
    rabbitmqUserCreatedRoutingKey: process.env.RABBITMQ_USER_CREATED_ROUTING_KEY || 'user.created',
  });
  