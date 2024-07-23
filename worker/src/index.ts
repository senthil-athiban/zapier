import { Kafka } from "kafkajs";

const kafka = new Kafka({
  clientId: "outbox",
  brokers: ["localhost:9092"],
});
const TOPIC_EVENTS = "zap-events";

async function main() {
  const consumer = kafka.consumer({ groupId: "main-worker" });
  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC_EVENTS, fromBeginning: true });

  await consumer.run({
    autoCommit: false,
    eachMessage: async ({ topic, message, partition }) => {
      console.log({
        partition,
        offset: message.offset,
        value: message.value.toString(),
      });

      // mocking the db calls
      await new Promise(r => setTimeout(r, 5000));


      await consumer.commitOffsets([{
            topic: TOPIC_EVENTS, 
            partition: partition, 
            offset: (parseInt(message.offset) + 1).toString()
        }])
    },
    
  });
}

main();
