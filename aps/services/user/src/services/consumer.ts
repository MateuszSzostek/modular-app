import { Subjects } from "../shared/services";

const { consumer } = require("./kafka");

interface EachMessagePayload {
  topic: string;
  partition: number;
  message: {
    value: Buffer | null;
  };
}

(async () => {
  try {
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
        const messageValue = message.value?.toString() || "null";
        console.log({
          topic,
          partition,
          value: messageValue,
        });
      },
    });
  } catch (error) {
    console.error("Error in Kafka Consumer:", error);
  }
})();
