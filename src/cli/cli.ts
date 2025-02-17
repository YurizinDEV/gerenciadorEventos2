import inquirer from "inquirer";
import { db } from "../services/db";
import { inserirUsuarioController, listarTodosUsuariosController, deletarUsuarioController } from "../controllers/userController";
import {
    adicionarEventoController,
    listarTodosEventosController,
    deletarEventoController
} from "../controllers/eventController";
import { listarLogsController } from "../controllers/logController";
import { Usuario } from "../models/userModel";

// Função principal para iniciar a CLI
export async function startCLI() {
    console.log("Bem-vindo(a) à CLI de Gerenciamento de Eventos e Usuários!\n");
    await loginFlow();
}

// Fluxo de login
async function loginFlow() {
    const { email, senha } = await inquirer.prompt([
        {
            name: "email",
            type: "input",
            message: "Digite seu email:",
        },
        {
            name: "senha",
            type: "password",
            message: "Digite sua senha:",
            mask: "*",
        },
    ]);

    // Verifica se o usuário existe no banco
    db.get(
        "SELECT * FROM usuarios WHERE email = ? AND senha = ?",
        [email, senha],
        async (err: Error, row: Usuario) => {
            if (err) {
                console.error("Erro ao verificar usuário:", err);
                return;
            }
            if (!row) {
                console.log("Credenciais inválidas. Tente novamente.\n");
                await loginFlow(); // Retorna ao fluxo de login
            } else {
                console.log(`\nLogin realizado com sucesso! Bem-vindo, ${row.nome}.\n`);

                // Verifica se row.id não é undefined antes de chamar mainMenu (Tratamento realizado apenas para resolver erro de id não ser obrigatório na model mas é autoincrement no banco de dados) 
                if (row.id !== undefined) {
                    mainMenu(row.id);
                } else {
                    console.error("Erro: ID do usuário não encontrado.");
                }
            }
        }
    );
}

//Menu principal após login
async function mainMenu(usuarioId: number) {
    const { opcao } = await inquirer.prompt([
        {
            name: "opcao",
            type: "list",
            message: "Selecione uma opção:",
            choices: [
                { name: "Gerenciar Usuários", value: "usuarios" },
                { name: "Gerenciar Eventos", value: "eventos" },
                { name: "Ver Logs", value: "logs" },
                { name: "Sair", value: "sair" },
            ],
        },
    ]);

    switch (opcao) {
        case "usuarios":
            await menuUsuarios();
            break;
        case "eventos":
            await menuEventos(usuarioId);
            break;
        case "logs":
            listarLogsController();
            break;
        case "sair":
            console.log("Encerrando CLI.");
            process.exit(0);
    }

    // Retorna ao menu principal após uma ação
    await mainMenu(usuarioId);
}

//Menu de gestão de usuários
async function menuUsuarios() {
    const { acaoUsuario } = await inquirer.prompt([
        {
            name: "acaoUsuario",
            type: "list",
            message: "O que deseja fazer com os usuários?",
            choices: [
                { name: "Listar todos os usuários", value: "listar" },
                { name: "Criar novo usuário", value: "criar" },
                { name: "Deletar usuário", value: "deletar" },
                { name: "Voltar", value: "voltar" },
            ],
        },
    ]);

    switch (acaoUsuario) {
        case "listar":
            listarTodosUsuariosController();
            break;
        case "criar":
            await criarUsuarioFlow();
            break;
        case "deletar":
            await deletarUsuarioFlow();
            break;
        case "voltar":
        default:
            return;
    }
}

// Fluxo para criar um novo usuário
async function criarUsuarioFlow() {
    const answers = await inquirer.prompt([
        {
            name: "nome",
            type: "input",
            message: "Nome do novo usuário:",
        },
        {
            name: "email",
            type: "input",
            message: "Email do novo usuário:",
        },
        {
            name: "senha",
            type: "password",
            message: "Senha do novo usuário:",
            mask: "*",
        },
    ]);
    inserirUsuarioController(answers);
}

//Fluxo para deletar um usuário por IDnull
async function deletarUsuarioFlow() {
    const { id } = await inquirer.prompt([
        {
            name: "id",
            type: "number",
            message: "Informe o ID do usuário que deseja deletar:",
        },
    ]);
    deletarUsuarioController(id);
}

//Menu de gestão de eventos
async function menuEventos(usuarioId: number) {
    const { acaoEvento } = await inquirer.prompt([
        {
            name: "acaoEvento",
            type: "list",
            message: "O que deseja fazer com os eventos?",
            choices: [
                { name: "Listar todos os eventos", value: "listar" },
                { name: "Criar novo evento", value: "criar" },
                { name: "Deletar evento", value: "deletar" },
                { name: "Voltar", value: "voltar" },
            ],
        },
    ]);

    switch (acaoEvento) {
        case "listar":
            listarTodosEventosController();
            break;
        case "criar":
            await criarEventoFlow(usuarioId);
            break;
        case "deletar":
            await deletarEventoFlow(usuarioId);
            break;
        case "voltar":
        default:
            return;
    }
}

// Fluxo para criar um novo evento
async function criarEventoFlow(usuarioId: number) {
    const answers = await inquirer.prompt([
        {
            name: "nome",
            type: "input",
            message: "Nome do evento:",
        },
        {
            name: "data",
            type: "input",
            message: "Data do evento (YYYY-MM-DD, por exemplo):",
        }
    ]);

    // completa com o ID do usuário logado
    adicionarEventoController({ ...answers, usuario_id: usuarioId });
}

//Fluxo para deletar um evento por ID
async function deletarEventoFlow(usuarioId: number) {
    const { id } = await inquirer.prompt([
        {
            name: "id",
            type: "number",
            message: "Informe o ID do evento que deseja deletar:",
        },
    ]);
    deletarEventoController({ id, usuario_id: usuarioId });
}