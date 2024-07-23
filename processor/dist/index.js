"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const kafkajs_1 = require("kafkajs");
const TOPIC_EVENTS = "zap-events";
const client = new client_1.PrismaClient();
const kafka = new kafkajs_1.Kafka({
    clientId: 'outbox',
    brokers: ['localhost:9092']
});
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        // connect kafka 
        const producer = kafka.producer();
        yield producer.connect();
        while (1) {
            // pull the actions from outbox
            const zap = yield client.zapRunOutBox.findMany({
                where: {},
                take: 10
            });
            // put those entries in kafka queue
            yield producer.send({
                topic: TOPIC_EVENTS,
                messages: zap.map((it) => ({
                    value: it.zapRunId
                }))
            });
            yield client.zapRunOutBox.deleteMany({
                where: {
                    id: {
                        in: zap.map(it => it.id)
                    }
                }
            });
        }
    });
}
main();
