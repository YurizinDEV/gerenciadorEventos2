import {
    adicionarEventoService,
    listarTodosEventosService,
    listarEventoPorIdService,
    deletarEventoService
} from "../services/eventService";
import { eventoSchema, idSchema, deletarEventoSchema } from "../validations/eventValidation";

export function adicionarEventoController(eventoData: unknown) {
    try {
        const { nome, data: dataString, usuario_id } = eventoSchema.parse(eventoData);
        const data: Date = new Date(dataString); 
        return adicionarEventoService(nome, data, usuario_id);
    } catch (error: any) {
        console.error("Validação do evento falhou:", error.errors || error);
        throw error; 
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
        throw error;
    }
}

export function deletarEventoController(data: unknown) {
    try {
        const { id, usuario_id } = deletarEventoSchema.parse(data);
        return deletarEventoService(id, usuario_id);
    } catch (error: any) {
        console.error("Validação dos dados para deletar evento falhou:", error.errors || error);
        throw error; 
    }
}