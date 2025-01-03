import { Kafka } from "kafkajs";

// Create Kafka instance
const kafka = new Kafka({
  clientId: "auth-service",
  brokers: ["kafka:9092"],
  requestTimeout: 30000, // 30 seconds
  connectionTimeout: 10000, // 10 seconds
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected");
};

export { producer, connectProducer };
