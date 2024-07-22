import express from "express";
import { PrismaClient } from "@prisma/client";
const app = express();
const client = new PrismaClient();
app.post("/hooks/catch/:userId/:zapId", async (req, res) => {
    const { userId, zapId } = req.params;
    const metadata = req.body;
    await client.$transaction(async tx => {
        const zap = await client.zapRun.create({
            data: {
                zapId: zapId,
                metadata: metadata
            }
        });

        await client.zapRunOutBox.create({
            data: {
                zapRunId: zap.id
            }
        })
    });

    return res.json({
        messsage: "Success"
    })
})

app.listen(3000);