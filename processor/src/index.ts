import { PrismaClient } from "@prisma/client";
import {Kafka} from "kafkajs";

const TOPIC_EVENTS="zap-events";
const client = new PrismaClient();
const kafka = new Kafka({
    clientId: 'outbox',
    brokers: ['localhost:9092']
})

async function main() {
    // connect kafka 
    const producer = kafka.producer();
    await producer.connect();
    while(1) {

        // pull the actions from outbox
        const zap = await client.zapRunOutBox.findMany({
            where: {},
            take: 10
        });

        // put those entries in kafka queue
        await producer.send({
            topic: TOPIC_EVENTS,
            messages: zap.map((it) => ({
                value: it.zapRunId
            }))
        })
    }
}
main();