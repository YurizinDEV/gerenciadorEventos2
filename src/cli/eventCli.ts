import inquirer from "inquirer";
import {
    adicionarEventoController,
    listarTodosEventosController,
    deletarEventoController
} from "../controllers/eventController";
import { logEventAction } from "./logCli";
import { menuPrincipal } from "./menuCli";


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
        { type: 'input', name: 'usuario_id', message: 'ID do Usuário que criou:' },  
    ]);  

    // Converte usuario_id de string para number  
    const usuarioId = Number(eventoData.usuario_id);  

    // Verifica se a conversão foi bem-sucedida  
    if (isNaN(usuarioId) || usuarioId <= 0) {  
        console.error("ID do Usuário inválido. Por favor, informe um número positivo.");  
        return;  
    }  

    await  adicionarEventoController({   
        nome: eventoData.nome,   
        data: eventoData.data,   
        usuario_id: usuarioId   
    });  
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