import inquirer from "inquirer";
import {
    adicionarEventoController,
    listarTodosEventosController,
    deletarEventoController
} from "../controllers/eventController";

//Menu de gestão de eventos
export async function menuEventos(usuarioId: number) {
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