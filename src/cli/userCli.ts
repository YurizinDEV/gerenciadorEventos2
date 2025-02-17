import inquirer from "inquirer";
import { inserirUsuarioController, listarTodosUsuariosController, deletarUsuarioController } from "../controllers/userController";

//Menu de gestão de usuários
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
}
