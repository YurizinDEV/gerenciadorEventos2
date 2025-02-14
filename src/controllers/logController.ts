import { z } from "zod";
import { registrarLogService, listarLogsService } from "../services/logService";

const logSchema = z.object({
    acao: z.string().min(1, "A ação é obrigatória"),
    tabela: z.string().min(1, "A tabela é obrigatória"),
    usuario_id: z.number().int().positive("O ID do usuário deve ser um número positivo"),
});

export function registrarLogController(logData: unknown) {
    try {
        const { acao, tabela, usuario_id } = logSchema.parse(logData);
        registrarLogService(acao, tabela, usuario_id);
    } catch (error: any) {
        console.error("Validação do log falhou:", error.errors || error);
    }
}

export function listarLogsController() {
    listarLogsService();
}