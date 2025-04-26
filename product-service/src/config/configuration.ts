export default () => ({
    port: parseInt(process.env.PORT || '3001', 10),
    mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/product_db',
    rabbitmqUrl: process.env.RABBITMQ_URL || 'amqp://guest:guest@localhost:5672',
    rabbitmqAuthQueue: process.env.RABBITMQ_AUTH_QUEUE || 'auth.rpc.requests',
  });