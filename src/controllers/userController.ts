import { z } from "zod";
import {
    inserirUsuarioService,
    listarTodosUsuariosService,
    listarUsuarioPorIdService,
    deletarUsuarioService
} from "../services/userService";
import { Usuario } from "../models/userModel";
import { usuarioSchema, idSchema } from "../validations/userValidation"; // Importando os schemas de validação  

export function inserirUsuarioController(usuarioData: unknown) {
    try {
        const usuario: Usuario = usuarioSchema.parse(usuarioData);
        return inserirUsuarioService(usuario.nome, usuario.email, usuario.senha);
    } catch (error: any) {
        console.error("Validação de usuário falhou:", error.errors || error);
        throw error; // Lança o erro para ser tratado em outro lugar, se necessário  
    }
}

export function listarTodosUsuariosController() {
    return listarTodosUsuariosService();
}

export function listarUsuarioPorIdController(idData: unknown) {
    try {
        const id = idSchema.parse(idData);
        return listarUsuarioPorIdService(id);
    } catch (error: any) {
        console.error("Validação do ID falhou:", error.errors || error);
        throw error; // Lança o erro para ser tratado em outro lugar, se necessário  
    }
}

export function deletarUsuarioController(idData: unknown) {
    try {
        const id = idSchema.parse(idData);
        return deletarUsuarioService(id);
    } catch (error: any) {
        console.error("Validação do ID falhou:", error.errors || error);
        throw error; // Lança o erro para ser tratado em outro lugar, se necessário  
    }
}