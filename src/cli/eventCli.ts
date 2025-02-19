import inquirer from "inquirer";
import {
    adicionarEventoController,
    listarTodosEventosController,
    deletarEventoController
} from "../controllers/eventController";
import { logEventAction } from "./logCli";
import { menuPrincipal } from "./menuCli";

/*//Menu de gestão de eventos
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
}*/
// cli/eventCli.ts  
// cli/eventCli.ts  


export async function gerenciarEventos(userId: number) {  
    const { eventAction } = await inquirer.prompt([  
        {  
            type: 'list',  
            name: 'eventAction',  
            message: 'Escolha uma ação de evento:',  
            choices: [  
                'Inserir Evento',  
                'Listar Todos os Eventos',  
                'Deletar Evento',  
                'Voltar'  
            ],  
        },  
    ]);  

    switch (eventAction) {  
        case 'Inserir Evento':  
            await inserirEvento(userId);  
            break;  
        case 'Listar Todos os Eventos':  
            await listarTodosEventos(userId);  
            break;  
        case 'Deletar Evento':  
            await deletarEvento(userId);  
            break;  
        case 'Voltar':  
            menuPrincipal(userId);     
        }  
}  

async function inserirEvento(userId: number) {  
    const eventoData = await inquirer.prompt([  
        { type: 'input', name: 'nome', message: 'Nome do Evento:' },  
        { type: 'input', name: 'data', message: 'Data do Evento (YYYY-MM-DD):' },  
        { type: 'input', name: 'criadoPor', message: 'ID do Usuário que criou:' },  
    ]);  

    await adicionarEventoController(eventoData);  
    await logEventAction(`Evento ${eventoData.nome} inserido com sucesso.`, eventoData.nome);  
    console.log('Evento inserido com sucesso!');  
    await gerenciarEventos(userId);  
}  

async function listarTodosEventos(userId: number) {  
    const eventos = await listarTodosEventosController();  
    console.log(eventos);  
    await logEventAction('Listagem de todos os eventos realizada.', 'Todos os Eventos');  
    await gerenciarEventos(userId);  
}  

async function deletarEvento(userId: number) {  
    const { id } = await inquirer.prompt([  
        { type: 'input', name: 'id', message: 'Digite o ID do evento a ser deletado:' },  
    ]);  

    await deletarEventoController(Number(id));  
    await logEventAction(`Evento com ID ${id} deletado.`, `Evento ID ${id}`);  
    console.log('Evento deletado com sucesso!');  
    await gerenciarEventos(userId);  
}