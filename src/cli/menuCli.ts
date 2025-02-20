import inquirer from "inquirer";
import { gerenciarEventos } from "./eventCli";
import { gerenciarUsuarios } from "./userCli";
import { menuSeeds } from "./seedsCli";
//Menu principal após login
/*export async function mainMenu(usuarioId: number) {
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
}*/


// cli/menuCli.ts  


export async function menuPrincipal(userId: number) {  
    const { action } = await inquirer.prompt([  
        {  
            type: 'list',  
            name: 'action',  
            message: 'Escolha uma ação:',  
            choices: [  
                'Gerenciar Usuários',  
                'Gerenciar Eventos',  
                'Gerar Seeds', // Nova opção para gerar seeds  
                'Sair'  
            ],  
        },  
    ]);  

    switch (action) {  
        case 'Gerenciar Usuários':  
            await gerenciarUsuarios(userId);  
            break;  
        case 'Gerenciar Eventos':  
            await gerenciarEventos(userId);  
            break;  
        case 'Gerar Seeds': // Opção para gerar seeds  
            await menuSeeds(userId); // Chama o menu de seeds  
            break;  
        case 'Sair':  
            console.log('Saindo...');  
            process.exit();  
    }  
} 