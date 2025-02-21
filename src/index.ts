import {
    inserirUsuarioController,
    listarTodosUsuariosController,
    listarUsuarioPorIdController,
    deletarUsuarioController
} from "./controllers/userController";
import {
    adicionarEventoController,
    listarTodosEventosController,
    listarEventoPorIdController,
    deletarEventoController
} from "./controllers/eventController";

/*
// Cria as tabelas: usuários, eventos e logs
criarTabelas();

// Inserir um usuário (dados validados no controller)
inserirUsuarioController({ nome: "João Silva", email: "joao@example.com", senha: "123456" });
inserirUsuarioController({ nome: "Maria Silva", email: "maria@example.com", senha: "123456" });

// Lista todos os usuários
listarTodosUsuariosController();

// Lista um usuário por ID (dados validados no controller)
listarUsuarioPorIdController(1);

// Deleta um usuário, validando os dados no controller
deletarUsuarioController(1);


// Adiciona um evento com base no usuário inserido
adicionarEventoController({ nome: "Evento de Teste", data: "2025-03-01", usuario_id: 1 });

// Lista todos os eventos
listarTodosEventosController();

// Lista um evento por ID (dados validados no controller)
listarEventoPorIdController(1);

// Deleta o evento, validando os dados no controller
deletarEventoController({ id: 1, usuario_id: 1 });


listarLogsService();*/


//import { startCLI } from "./cli/loginCli";
//startCLI();


//inserirUsuarioController({ nome: "admin", email: "admin@example.com", senha: "admin123" });

// main.ts  
import { criarTabelaUsuarios } from './services/userService';
import { criarTabelaEventos } from './services/eventService';
import { startCLI } from './cli/loginCli';

async function main() {
    criarTabelaUsuarios();
    criarTabelaEventos();
    setTimeout(() => {
        startCLI();
    }, 1200);
}

main().catch(err => {
    console.error(err);
});