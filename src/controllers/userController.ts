//userController

import {
    inserirUsuarioService,
    listarTodosUsuariosService,
    listarUsuarioPorIdService,
    deletarUsuarioService,
    atualizarUsuarioService
} from "../services/userService";
import { Usuario } from "../models/userModel";
import { usuarioSchema, idSchema } from "../validations/userValidation"; 

export function inserirUsuarioController(usuarioData: unknown) {
    try {
        const usuario: Usuario = usuarioSchema.parse(usuarioData);
        return inserirUsuarioService(usuario.nome, usuario.email, usuario.senha);
    } catch (error: any) {
        console.error("Validação de usuário falhou:", error.errors || error);
        throw error; 
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
        throw error; 
    }
}

export function deletarUsuarioController(idData: unknown) {
    try {
        const id = idSchema.parse(idData);
        return deletarUsuarioService(id);
    } catch (error: any) {
        console.error("Validação do ID falhou:", error.errors || error);
        throw error; 
    }
}

export function atualizarUsuarioController(idData: unknown, usuarioData: unknown) {  
    try {  
        const id = idSchema.parse(idData);
        const usuario = usuarioSchema.parse(usuarioData);
        return atualizarUsuarioService(id, usuario.nome, usuario.email, usuario.senha);  
    } catch (error: any) {  
        console.error("Validação do usuário falhou:", error.errors || error);  
        throw error; 
    }  
}  