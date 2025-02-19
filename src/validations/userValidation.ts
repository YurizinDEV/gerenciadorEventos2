import { z } from "zod";

export const usuarioSchema = z.object({
    nome: z.string().min(1, { message: "O nome é obrigatório" }),
    email: z.string().email({ message: "Email inválido" }),
    senha: z.string().min(6, { message: "A senha deve ter pelo menos 6 caracteres" }),
});

export const idSchema = z.number().int().positive({ message: "O ID deve ser um número positivo." });