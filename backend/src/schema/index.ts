import { z } from "zod";

export const SignUpSchema = z.object({
    name: z.string().min(2),
    email: z.string().min(5),
    password: z.string().min(4)
});

export const SignInSchema = z.object({
    email: z.string(),
    password: z.string()
});

export const zapSchema = z.object({
    
})