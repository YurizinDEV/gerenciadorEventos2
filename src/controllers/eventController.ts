import { z } from "zod";
import { adicionarEventoService, listarTodosEventosService, listarEventoPorIdService, deletarEventoService } from "../services/eventService";
import { Evento } from "../models/eventModel";

//Validação para um evento, conforme os parâmetros esperados pelo serviço  
const eventoSchema = z.object({
    nome: z.string().min(1, { message: "O nome do evento é obrigatório" }),
    data: z.string().refine(
        (val) => !isNaN(Date.parse(val)),
        { message: "Data inválida. Informe uma data em formato válido." }
    ),
    usuario_id: z.number().int().positive({ message: "O ID do usuário deve ser um número positivo." })
});

//Validação do ID dos eventos  
const idSchema = z.number().int().positive({ message: "O ID deve ser um número positivo." });

export function adicionarEventoController(eventoData: unknown) {
    try {
        const { nome, data, usuario_id } = eventoSchema.parse(eventoData);
        adicionarEventoService(nome, data, usuario_id);
    } catch (error: any) {
        console.error("Validação do evento falhou:", error.errors || error);
    }
}

export function listarTodosEventosController() {
    listarTodosEventosService();
}

export function listarEventoPorIdController(idData: unknown) {
    try {
        const id = idSchema.parse(idData);
        listarEventoPorIdService(id);
    } catch (error: any) {
        console.error("Validação do ID falhou:", error.errors || error);
    }
}

export function deletarEventoController(data: unknown) {
    const schema = z.object({
        id: idSchema,
        usuario_id: z.number().int().positive({ message: "O ID do usuário deve ser um número positivo." })
    });

    try {
        const { id, usuario_id } = schema.parse(data);
        deletarEventoService(id, usuario_id);
    } catch (error: any) {
        console.error("Validação dos dados para deletar evento falhou:", error.errors || error);
    }
}  