import { db } from "../database/db";

export function registrarLogService(acao: string, tabela: string, usuario_id: number) {
    const query = `INSERT INTO logs (acao, tabela, usuario_id, data) VALUES (?, ?, ?, datetime('now'))`;
    db.run(query, [acao, tabela, usuario_id], function (erro) {
        if (erro) console.error(`Erro ao registrar log: ${erro}`);
        else console.log(`Log registrado para ação "${acao}" na tabela "${tabela}"`);
    });
}

export function listarLogsService() {
    const query = `SELECT * FROM logs`;
    db.all(query, (erro, linhas) => {
        if (erro) console.error(`Erro ao listar logs: ${erro}`);
        else console.log(linhas);
    });
}
