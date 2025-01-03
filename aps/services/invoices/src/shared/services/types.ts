export interface EachMessagePayload {
  topic: string;
  partition: number;
  message: {
    value: Buffer | null;
  };
}
