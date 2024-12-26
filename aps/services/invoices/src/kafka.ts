const { Kafka } = require("kafkajs");

// Create Kafka instance
const kafka = new Kafka({
  clientId: "invoices-service",
  brokers: ["api.localhost:82/api/events/"],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected");
};

module.exports = { producer, connectProducer };
