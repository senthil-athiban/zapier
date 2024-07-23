import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlware";

const router = Router();

// submit zap endpoint
router.post("/", authMiddleware, (req: Request, res: Response) => {
    
});

// get all zaps
router.get("/", authMiddleware, (req: Request, res: Response) => {

})

// get particular zap
router.get("/:zapId", authMiddleware, (req: Request, res: Response) => {

})

export const zapRouter = router;