//eventController

import {
    adicionarEventoService,
    listarTodosEventosService,
    listarEventoPorIdService,
    deletarEventoService
} from "../services/eventService";
import { eventoSchema, idSchema, deletarEventoSchema } from "../validations/eventValidation";

export function adicionarEventoController(eventoData: unknown) {
    try {
        const { nome, data, usuario_id } = eventoSchema.parse(eventoData);
        return adicionarEventoService(nome, new Date(data.toString()), usuario_id);
    } catch (error: any) {
        console.error("Validação do evento falhou:", error.errors || error);
        throw error; // Lança o erro para ser tratado em outro lugar, se necessário  
    }
}

export function listarTodosEventosController() {
    return listarTodosEventosService();
}

export function listarEventoPorIdController(idData: unknown) {
    try {
        const id = idSchema.parse(idData);
        return listarEventoPorIdService(id);
    } catch (error: any) {
        console.error("Validação do ID falhou:", error.errors || error);
        throw error; // Lança o erro para ser tratado em outro lugar, se necessário  
    }
}

export function deletarEventoController(idData: unknown) {
    try {
        const id = idSchema.parse(idData);
        return deletarEventoService(id);
    } catch (error: any) {
        console.error("Validação dos dados para deletar evento falhou:", error.errors || error);
        throw error;
    }
}
