import { z } from "zod";

// Validação para um evento, conforme os parâmetros esperados pelo serviço  
export const eventoSchema = z.object({
    nome: z.string().min(1, { message: "O nome do evento é obrigatório" }),
    data: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Data inválida. Informe uma data em formato válido." }
    ),
    usuario_id: z.number().int().positive({ message: "O ID do usuário deve ser um número positivo." })
});

// Validação do ID dos eventos  
export const idSchema = z.number().int().positive({ message: "O ID deve ser um número positivo." });

// Validação para deletar um evento  
export const deletarEventoSchema = z.object({
    id: idSchema,
    usuario_id: z.number().int().positive({ message: "O ID do usuário deve ser um número positivo." })
});  