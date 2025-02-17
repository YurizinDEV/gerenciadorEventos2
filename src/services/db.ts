import sqlite3 from "sqlite3";
import {
    criarTabelaUsuarios,
    criarTabelaEventos,
    criarTabelaLogs
} from "../seeds/createTable";

export const db = new sqlite3.Database("./data/eventos.db");

// Função para criar todas as tabelas
export function criarTabelas() {
    criarTabelaUsuarios();
    criarTabelaEventos();
    criarTabelaLogs();
}