//userService

import { db } from "./dbService";
import { Usuario } from "../models/userModel";

// Cria tabela de usuários
export function criarTabelaUsuarios() {
    const query = `CREATE TABLE IF NOT EXISTS usuarios ( id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, senha TEXT )`;
    db.run(query, (erro) => {
        if (erro) console.error("Erro ao criar tabela usuarios:", erro);
        else console.log("Tabela usuarios criada com sucesso!");
    });
}

export function inserirUsuarioService(nome: string, email: string, senha: string) {
    const query = `INSERT INTO usuarios (nome, email, senha) VALUES (?,?,?) `;
    db.run(query, [nome, email, senha], function (erro) {
        if (erro) console.error(`Erro ao inserir usuário: ${erro}`);
        else console.log(`Usuário ${this.lastID} cadastrado com sucesso!`);
    });
}

export function listarTodosUsuariosService():any {
    const query = `SELECT * FROM usuarios`;
    db.all(query, (erro, linhas: Usuario[]) => {
        if (erro) console.error(`Erro ao listar usuários: ${erro}`);
        else console.log(linhas);
    });
}

export function listarUsuarioPorIdService(id: number) {
    const query = `SELECT * FROM usuarios WHERE id = ?`;
    db.get(query, [id], (erro, linha: Usuario) => {
        if (erro) console.error(`Erro ao buscar o usuário: ${erro}`);
        else if (linha) console.log(linha);
        else console.log(`Nenhum usuário encontrado com o id ${id}`);
    });
}

export function deletarUsuarioService(id: number) {
    const query = `DELETE FROM usuarios WHERE id = ?`;
    db.run(query, [id], function (erro) {
        if (erro) console.error(`Erro ao deletar usuário: ${erro}`);
        else console.log(`Usuário com id ${id} deletado com sucesso!`);
    });
}