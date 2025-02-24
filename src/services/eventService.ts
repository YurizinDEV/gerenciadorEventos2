//eventService

import { db } from "./dbService";
import { Evento } from "../models/eventModel";
import { formatarData } from '../utils/dateUtils';

// Cria tabela de eventos
export function criarTabelaEventos() {
    const query = `CREATE TABLE IF NOT EXISTS eventos ( id INTEGER PRIMARY KEY AUTOINCREMENT, nome TEXT, data DATE, usuario_id INTEGER, FOREIGN KEY (usuario_id) REFERENCES usuarios(id) )`;
    db.run(query, (erro) => {
        if (erro) console.error("Erro ao criar tabela eventos:", erro);
        else console.log("Tabela eventos criada com sucesso!");
    });
}

export function adicionarEventoService(nome: string, data: Date, usuario_id: number) {
    const query = `INSERT INTO eventos (nome, data, usuario_id) VALUES (?, ?, ?)`;
    db.run(query, [nome, data, usuario_id], function (erro) {
        if (erro) console.error(`\nErro ao adicionar evento: ${erro}`); //
        else {
            console.log(`\nEvento ${this.lastID} adicionado com sucesso!`);
        }
    });
}

export function adicionarVariosEventosService(eventos: Evento[]) {  
    // Verifica se há eventos para adicionar  
    if (eventos.length === 0) {  
        console.log("Nenhum evento para adicionar.");  
        return;  
    }  
    // Cria a consulta SQL para inserção múltipla  
    const query = `INSERT INTO eventos (nome, data, usuario_id) VALUES ${eventos.map(() => '(?, ?, ?)').join(', ')}`;  
    
    // Cria um array de valores para a consulta  
    const valores = eventos.flatMap(evento => [evento.nome, evento.data, evento.criadoPor]);  

    db.run(query, valores, function (erro) {  
        if (erro) {  
            console.error(`\nErro ao adicionar eventos: ${erro}`);  
        } else {  
            console.log(`\n${this.changes} eventos adicionados com sucesso!`);  
        }  
    });  
}

export function listarTodosEventosService() {
    const query = `SELECT * FROM eventos`;
    return new Promise((resolve, reject) => {
        db.all(query, (erro, linhas: Evento[]) => {
            if (erro) {
                console.error(`\nErro ao listar eventos: ${erro}`);
                reject(erro);
            } else {
                const eventosFormatados = linhas.map(evento => ({
                    ...evento,
                    data: formatarData(Number(evento.data)),
                }));
                resolve(eventosFormatados);
            }
        });
    });
}

export function listarEventoPorIdService(id: number) {
    const query = `SELECT * FROM eventos WHERE id = ?`;
    return new Promise((resolve, reject) => {
        db.get(query, [id], (erro, linha: Evento) => {
            if (erro) {
                console.error(`\nErro ao buscar evento: ${erro}`);
                reject(erro);
            } else if (linha) {
                console.log(linha);
            } else {
                console.log(`\nNenhum evento encontrado com o id ${id}`);
                resolve(null); // Retorna null se não encontrar  
            }
        });
    });
}

export function deletarEventoService(id: number) {
    const query = `DELETE FROM eventos WHERE id = ?`;
    db.run(query, [id], function (erro) {
        if (erro) console.error(`\nErro ao deletar evento: ${erro}`);
        else {
            console.log(`\nEvento com id ${id} deletado com sucesso!\n`);
        }
    });
}

export function atualizarEventoService(id: number, nome: string, data: Date, usuario_id: number) {  
    const query = `UPDATE eventos SET nome = ?, data = ?, usuario_id = ? WHERE id = ?`;  
    db.run(query, [nome, data, usuario_id, id], function (erro) {  
        if (erro) {  
            console.error(`\nErro ao atualizar evento: ${erro}`);  
        } else {  
            console.log(`\nEvento com id ${id} atualizado com sucesso!`);  
        }  
    });  
}  

