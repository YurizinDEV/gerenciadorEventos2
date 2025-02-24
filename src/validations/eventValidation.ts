//eventValidation

import { z } from "zod";

export const idSchema = z.number().int().positive({ message: "O ID deve ser um número positivo." });

export const eventoSchema = z.object({
    nome: z.string().min(1, { message: "O nome do evento é obrigatório" }),
    data: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Data inválida. Informe uma data em formato válido." }
    ),
    usuario_id: idSchema
});
