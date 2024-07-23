import { Request, Response, Router } from "express";
import { authMiddleware } from "../middlware";

const router = Router();

router.post("/", authMiddleware, (req: Request, res: Response) => {

});

router.get("/", authMiddleware, (req: Request, res: Response) => {

})

router.get("/:zapId", authMiddleware, (req: Request, res: Response) => {

})

export const zapRouter = router;