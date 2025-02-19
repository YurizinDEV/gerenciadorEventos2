import inquirer from "inquirer";
import { inserirUsuarioController, listarTodosUsuariosController, listarUsuarioPorIdController, deletarUsuarioController } from "../controllers/userController";
import { logUserAction } from "./logCli";
import { menuPrincipal } from "./menuCli";
//import { getCurrentUser } from "../utils/";
/*//Menu de gestão de usuários
export async function menuUsuarios() {
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
}*/
// cli/userCli.ts  
// cli/userCli.ts  

export async function gerenciarUsuarios(userId: number) {  
    const { userAction } = await inquirer.prompt([  
        {  
            type: 'list',  
            name: 'userAction',  
            message: 'Escolha uma ação de usuário:',  
            choices: [  
                'Inserir Usuário',  
                'Listar Todos os Usuários',  
                'Listar Usuário por ID',  
                'Deletar Usuário',  
                'Voltar'  
            ],  
        },  
    ]);  

    switch (userAction) {  
        case 'Inserir Usuário':  
            await inserirUsuario(userId);  
            break;  
        case 'Listar Todos os Usuários':  
            await listarTodosUsuarios(userId);  
            break;  
        case 'Listar Usuário por ID':  
            await listarUsuarioPorId(userId);  
            break;  
        case 'Deletar Usuário':  
            await deletarUsuario(userId);  
            break;  
        case 'Voltar':  
            menuPrincipal(userId); 
    }  
}  

async function inserirUsuario(userId: number) {  
    const usuarioData = await inquirer.prompt([  
        { type: 'input', name: 'nome', message: 'Nome:' },  
        { type: 'input', name: 'email', message: 'Email:' },  
        { type: 'input', name: 'senha', message: 'Senha:' },  
    ]);  

    await inserirUsuarioController(usuarioData);  
    await logUserAction(`Usuário ${usuarioData.nome} inserido com sucesso.`, userId);  
    console.log('Usuário inserido com sucesso!');  
    await gerenciarUsuarios(userId);  
}  

async function listarTodosUsuarios(userId: number) {  
    const usuarios = await listarTodosUsuariosController();  
    console.log(usuarios);  
    await logUserAction('Listagem de todos os usuários realizada.', userId);  
    await gerenciarUsuarios(userId);  
}  

async function listarUsuarioPorId(userId: number) {  
    const { id } = await inquirer.prompt([  
        { type: 'input', name: 'id', message: 'Digite o ID do usuário:' },  
    ]);  

    const usuario = await listarUsuarioPorIdController(Number(id));  
    console.log(usuario);  
    await logUserAction(`Usuário com ID ${id} listado.`, userId);  
    await gerenciarUsuarios(userId);  
}  

async function deletarUsuario(userId: number) {  
    const { id } = await inquirer.prompt([  
        { type: 'input', name: 'id', message: 'Digite o ID do usuário a ser deletado:' },  
    ]);  

    await deletarUsuarioController(Number(id));  
    await logUserAction(`Usuário com ID ${id} deletado.`, userId);  
    console.log('Usuário deletado com sucesso!');  
    await gerenciarUsuarios(userId);  
}