import inquirer from "inquirer";
import { listarLogsController } from "../controllers/logController";
import { menuUsuarios } from "./userCli";
import { menuEventos } from "./eventCli";

//Menu principal após login
export async function mainMenu(usuarioId: number) {
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