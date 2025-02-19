import sqlite3 from "sqlite3";
import {criarTabelaUsuarios} from "./userService";
import {criarTabelaEventos} from "./eventService";

export const db = new sqlite3.Database("./data/eventos.db");

// Função para criar todas as tabelas
export function criarTabelas() {
    criarTabelaUsuarios();
    criarTabelaEventos();
}