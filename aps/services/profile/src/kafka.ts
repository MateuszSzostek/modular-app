import {
  AuthSignedUpMessage,
  EachMessagePayload,
  Subjects,
} from "./shared/services";
import ProfileProcessor from "./processors/profileProcessor";

import { Consumer, Kafka } from "kafkajs";

// Create Kafka instance
const kafka = new Kafka({
  clientId: "profile-service",
  brokers: ["kafka:9092"],
  requestTimeout: 30000, // 30 seconds
  connectionTimeout: 10000, // 10 seconds
});

const producer = kafka.producer();

const connectProducer = async () => {
  await producer.connect();
  console.log("Kafka Producer connected");
};

const consumer: Consumer = kafka.consumer({ groupId: "profile-service-group" });

export const startKafkaConsumer = async () => {
  try {
    const profileProcessor = new ProfileProcessor();

    await consumer.connect();
    console.log("Kafka Consumer connected");

    // Subscribe to a topic
    await consumer.subscribe({
      topic: Subjects.AuthSignedUp,
      fromBeginning: true,
    });

    // Process messages
    await consumer.run({
      eachMessage: async ({
        topic,
        partition,
        message,
      }: EachMessagePayload) => {
        switch (topic) {
          case Subjects.AuthSignedUp:
            const values: AuthSignedUpMessage =
              message.value?.toString() as unknown as AuthSignedUpMessage;
            profileProcessor.addProfile({
              name: values?.email,
              ownerId: values?.userId,
            });
        }
      },
    });
  } catch (error) {
    console.error("Error in Kafka Consumer:", error);
  }
};

export { producer, connectProducer };
