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
        if (erro) console.error(`\nErro ao inserir usuário: ${erro}`);
        else console.log(`\nUsuário ${this.lastID} cadastrado com sucesso!`);
    });
}
export async function  listarTodosUsuariosService():Promise<any> {
    const query = `SELECT * FROM usuarios`;
    return new Promise((resolve, reject) => {  
        const query = `SELECT * FROM usuarios`;  
        db.all(query, (erro, linhas: Usuario[]) => {  
            if (erro) {  
                console.error(`\nErro ao listar usuários: ${erro}`);  
                reject(erro); 
            } else {  
                console.log(linhas);  
                resolve(linhas); 
            }  
        });  
    });  
}

export function listarUsuarioPorIdService(id: number) {
    const query = `SELECT * FROM usuarios WHERE id = ?`;
    db.get(query, [id], (erro, linha: Usuario) => {
        if (erro) console.error(`\nErro ao buscar o usuário: ${erro}`);
        else if (linha) console.log(linha);
        else console.log(`\nNenhum usuário encontrado com o id ${id}`);
    });
}

export function deletarUsuarioService(id: number) {
    const query = `DELETE FROM usuarios WHERE id = ?`;
    db.run(query, [id], function (erro) {
        if (erro) console.error(`\nErro ao deletar usuário: ${erro}`);
        else console.log(`\nUsuário com id ${id} deletado com sucesso!`);
    });
}

export function atualizarUsuarioService(id: number, nome: string, email: string, senha: string) {  
    const query = `UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?`;  
    db.run(query, [nome, email, senha, id], function (erro) {  
        if (erro) {  
            console.error(`\nErro ao atualizar usuário: ${erro}`);  
        } else {  
            console.log(`\nUsuário com id ${id} atualizado com sucesso!`);  
        }  
    });  
}