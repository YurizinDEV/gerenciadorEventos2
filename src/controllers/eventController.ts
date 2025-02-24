//eventController

import {
    adicionarEventoService,
    listarTodosEventosService,
    listarEventoPorIdService,
    deletarEventoService,
    atualizarEventoService
} from "../services/eventService";
import { eventoSchema, idSchema } from "../validations/eventValidation";

export function adicionarEventoController(eventoData: unknown) {
    try {
        const { nome, data, usuario_id } = eventoSchema.parse(eventoData);
        return adicionarEventoService(nome, new Date(data.toString()), usuario_id);
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

export function deletarEventoController(idData: unknown) {
    try {
        const id = idSchema.parse(idData);
        return deletarEventoService(id);
    } catch (error: any) {
        console.error("Validação dos dados para deletar evento falhou:", error.errors || error);
        throw error;
    }
}

import { z } from "zod";  

export function atualizarEventoController(idData: unknown, eventoData: unknown) {  
    try {  
        const id = idSchema.parse(idData);

        const eventoDataValidado = eventoSchema.parse(eventoData);

        const { nome, data, usuario_id } = eventoDataValidado;  

        return atualizarEventoService(id, nome, new Date(data.toString()), usuario_id);  
    } catch (error: any) {  
        console.error("Validação do evento falhou:", error.errors || error);  
        throw error;  
    }  
}  