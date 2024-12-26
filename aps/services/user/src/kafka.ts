import { Consumer } from "kafkajs";

const { Kafka } = require("kafkajs");

// Create Kafka instance
const kafka = new Kafka({
  clientId: "user-service",
  brokers: ["api.localhost:82/api/events/"],
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected");
};

// Kafka consumer instance
const consumer: Consumer = kafka.consumer({ groupId: "typescript-group" });

module.exports = { producer, consumer, connectProducer };
