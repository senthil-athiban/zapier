import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlware";
import { prismaClient } from "../db";
import { zapSchema } from "../schema";

const router = Router();

// submit zap endpoint
router.post("/", authMiddleware, async (req: Request, res: Response) => {
    //@ts-ignore
    const id = req.id;
    const body = req.body;

    const parsedData = zapSchema.safeParse(body);
    
    if(!parsedData.success) return res.status(500).json({message: "Invalid inputs"});

    const { availableTrigger , actions} = parsedData.data;
    const zapRun = await prismaClient.$transaction(async tx => {
        const zap = await tx.zap.create({
            data: {
                userId: parseInt(id),
                triggerId: "123",
                actions: {
                    create: actions.map((it, index) => ({
                        actionId: it.actionId,
                    }))
                }
            }
        });

        const trigger = await tx.trigger.create({
            data: {
                triggerId: availableTrigger,
                zapId: zap.id
            }
        });

        await tx.zap.update({
            where: {id: zap.id},
            data: {
                triggerId: trigger.id
            }
        });

        return zap;
    });

    return res.json({zapRun});
});

// get all zaps
router.get("/", authMiddleware, async (req: Request, res: Response) => {
    //@ts-ignore
    const id = req.id;
    

    const zap = await prismaClient.zap.findMany({
        where: {
            userId: id
        },
        include: {
            trigger: {
                include: {
                    type: true
                }
            },
            actions: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({zap});
})

// get particular zap
router.get("/:zapId", authMiddleware, async (req: Request, res: Response) => {
    const zapId = req.params.zapId;

    //@ts-ignore
    const id = req.id;
    

    const zap = await prismaClient.zap.findFirst({
        where: {
            userId: id,
            id: zapId
        },
        include: {
            trigger: {
                include: {
                    type: true
                }
            },
            actions: {
                include: {
                    type: true
                }
            }
        }
    });

    return res.json({zap});
})

export const zapRouter = router;