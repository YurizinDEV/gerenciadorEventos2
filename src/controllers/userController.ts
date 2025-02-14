import { z } from "zod";
import { inserirUsuarioService, listarTodosUsuariosService, listarUsuarioPorIdService, deletarUsuarioService } from "../services/userService";
import { Usuario } from "../models/userModel";

//Validação para usuário
const usuarioSchema = z.object({
    nome: z.string().min(1, "O nome é obrigatório"),
    email: z.string().email("Email inválido"),
    senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

const idSchema = z.number().int().positive("O ID deve ser um número positivo");

export function inserirUsuarioController(usuarioData: unknown) {
    try {
        const usuario: Usuario = usuarioSchema.parse(usuarioData);
        inserirUsuarioService(usuario.nome, usuario.senha, usuario.email);
    } catch (error: any) {
        console.error("Validação de usuário falhou:", error.errors || error);
    }
}

export function listarTodosUsuariosController() {
    listarTodosUsuariosService();
}

export function listarUsuarioPorIdController(idData: unknown) {
    try {
        const id = idSchema.parse(idData);
        listarUsuarioPorIdService(id);
    } catch (error: any) {
        console.error("Validação do ID falhou:", error.errors || error);
    }
}

export function deletarUsuarioController(idData: unknown) {
    try {
        const id = idSchema.parse(idData);
        deletarUsuarioService(id);
    } catch (error: any) {
        console.error("Validação do ID falhou:", error.errors || error);
    }
}