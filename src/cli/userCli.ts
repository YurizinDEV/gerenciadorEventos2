// cli/userCli


import inquirer from "inquirer";
import { inserirUsuarioController, listarTodosUsuariosController, listarUsuarioPorIdController, deletarUsuarioController, atualizarUsuarioController } from "../controllers/userController";
import { logUserAction } from "./logCli";
import { menuPrincipal } from "./menuCli";

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
                'Atualizar Usuário',   
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
        case 'Atualizar Usuário':
            await atualizarUsuario(userId);  
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

async function atualizarUsuario(userId: number) {  
    const usuarioData = await inquirer.prompt([  
        { type: 'input', name: 'id', message: 'Digite o ID do usuário a ser atualizado:' },  
        { type: 'input', name: 'nome', message: 'Novo Nome:' },  
        { type: 'input', name: 'email', message: 'Novo Email:' },  
        { type: 'input', name: 'senha', message: 'Nova Senha:' },  
    ]);  

    const usuarioId = Number(usuarioData.id);  

    if (isNaN(usuarioId) || usuarioId <= 0) {  
        console.error("ID do Usuário inválido. Por favor, informe um número positivo.");  
        return;  
    }  


    await atualizarUsuarioController(usuarioId, {  
        nome: usuarioData.nome,  
        email: usuarioData.email,  
        senha: usuarioData.senha  
    });  

    await logUserAction(`Usuário com ID ${usuarioData.id} atualizado com sucesso.`, userId);  
    console.log('Usuário atualizado com sucesso!');  
    await gerenciarUsuarios(userId);  
}  