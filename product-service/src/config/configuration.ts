export default () => ({
  port: parseInt(process.env.PORT || '3001', 10),
  mongoUri: process.env.MONGODB_URI,
  rabbitmqUrl: process.env.RABBITMQ_URL,
  rabbitmqAuthQueue: process.env.RABBITMQ_AUTH_QUEUE,
  rabbitmqUserEventsQueue: process.env.RABBITMQ_USER_EVENTS_QUEUE,
});
