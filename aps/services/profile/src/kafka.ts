/*
import {
  AuthSignedUpMessage,
  EachMessagePayload,
  Subjects,
} from "./shared/services";
import UserProcessor from "./processors/profileProcessor";

import { Consumer, Kafka } from "kafkajs";

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
//const consumer: Consumer = kafka.consumer({ groupId: "user-service-group" });

const consumer: Consumer = kafka.consumer({ groupId: "user-service-group" });

export const startKafkaConsumer = async () => {
  try {
    const userProcessor = new UserProcessor();

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
            userProcessor.addUser({
              userId: values?.userId,
              email: values?.email,
              name: "",
              surname: "",
              birthDate: "",
              identifier: "",
            });
        }
      },
    });
  } catch (error) {
    console.error("Error in Kafka Consumer:", error);
  }
};

export { producer, connectProducer };
*/
