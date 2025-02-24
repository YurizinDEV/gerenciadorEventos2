// menuCli

import inquirer from "inquirer";
import { gerenciarEventos } from "./eventCli";
import { gerenciarUsuarios } from "./userCli";
import { menuSeeds } from "./seedsCli";


export async function menuPrincipal(userId: number) {  
    const { action } = await inquirer.prompt([  
        {  
            type: 'list',  
            name: 'action',  
            message: 'Escolha uma ação:',  
            choices: [  
                'Gerenciar Usuários',  
                'Gerenciar Eventos',  
                'Gerar Seeds', 
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
        case 'Gerar Seeds': 
            await menuSeeds(userId); 
            break;  
        case 'Sair':  
            console.log('Saindo...');  
            process.exit();  
    }  
} 