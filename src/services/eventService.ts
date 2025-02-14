import { db } from "../database/db";
import { Evento } from "../models/eventModel";
import { registrarLogService } from "./logService";

export function adicionarEventoService(nome: string, data: string, usuario_id: number) {
    const query = `INSERT INTO eventos (nome, data, usuario_id) VALUES (?, ?, ?)`;
    db.run(query, [nome, data, usuario_id], function (erro) {
        if (erro) console.error(`Erro ao adicionar evento: ${erro}`); //
        else {
            console.log(`Evento ${this.lastID} adicionado com sucesso!`);
            registrarLogService("inserir", "eventos", usuario_id);
        }
    });
}

export function listarTodosEventosService() {
    const query = `SELECT * FROM eventos`;
    db.all(query, (erro, linhas: Evento[]) => {
        if (erro) console.error(`Erro ao listar eventos: ${erro}`);
        else console.log(linhas);
    });
}

export function listarEventoPorIdService(id: number) {
    const query = `SELECT * FROM eventos WHERE id = ?`;
    db.get(query, [id], (erro, linha: Evento) => {
        if (erro) console.error(`Erro ao buscar evento: ${erro}`);
        else if (linha) console.log(linha);
        else console.log(`Nenhum evento encontrado com o id ${id}`);
    });
}

export function deletarEventoService(id: number, usuario_id: number) {
    const query = `DELETE FROM eventos WHERE id = ?`;
    db.run(query, [id], function (erro) {
        if (erro) console.error(`Erro ao deletar evento: ${erro}`);
        else {
            console.log(`Evento com id ${id} deletado com sucesso!`);
            registrarLogService("deletar", "eventos", usuario_id);
        }
    });
}