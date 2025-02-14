import { db } from "../database/db";

// Cria tabela de usuários
export function criarTabelaUsuarios() {
    const query = `CREATE TABLE IF NOT EXISTS usuarios ( id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, email TEXT, senha TEXT )`;
    db.run(query, (erro) => {
        if (erro) console.error("Erro ao criar tabela usuarios:", erro);
        else console.log("Tabela usuarios criada com sucesso!");
    });
}

// Cria tabela de eventos
export function criarTabelaEventos() {
    const query = `CREATE TABLE IF NOT EXISTS eventos ( id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, data TEXT, usuario_id INTEGER, FOREIGN KEY (usuario_id) REFERENCES usuarios(id) )`;
    db.run(query, (erro) => {
        if (erro) console.error("Erro ao criar tabela eventos:", erro);
        else console.log("Tabela eventos criada com sucesso!");
    });
}

// Cria tabela de logs
export function criarTabelaLogs() {
    const query = `CREATE TABLE IF NOT EXISTS logs ( id INTEGER PRIMARY KEY AUTOINCREMENT, acao TEXT, tabela TEXT, usuario_id INTEGER, data TEXT, FOREIGN KEY (usuario_id) REFERENCES usuarios(id) )`;
    db.run(query, (erro) => {
        if (erro) console.error("Erro ao criar tabela logs:", erro);
        else console.log("Tabela logs criada com sucesso!");
    });
}

// Função para criar todas as tabelas
export function criarTabelas() {
    criarTabelaUsuarios();
    criarTabelaEventos();
    criarTabelaLogs();
}