import { Consumer } from "kafkajs";

const { Kafka } = require("kafkajs");

// Create Kafka instance
const kafka = new Kafka({
  clientId: "user-service",
  brokers: ["kafka:9092"],
  requestTimeout: 30000, // 30 seconds
  connectionTimeout: 10000, // 10 seconds
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected");
};

// Kafka consumer instance
const consumer: Consumer = kafka.consumer({ groupId: "user-service-group" });

module.exports = { producer, consumer, connectProducer };
