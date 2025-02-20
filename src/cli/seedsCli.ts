// seeds.cli.ts  
import inquirer from 'inquirer';
import { seedEvents } from '../seeds/eventsSeeds'; 
import { seedUsers } from '../seeds/userSeeds';
import { menuPrincipal } from './menuCli';

export async function menuSeeds(userId: number) {  
    const { seedAction } = await inquirer.prompt([  
        {  
            type: 'list',  
            name: 'seedAction',  
            message: 'Escolha o tipo de seed a gerar:',  
            choices: [  
                'Gerar Seeds de Usuários (10 Usuários)',  
                'Gerar Seeds de Eventos (10 Eventos)',   
                'Voltar ao Menu Principal'  
            ],  
        },  
    ]);  

    switch (seedAction) {  
        case 'Gerar Seeds de Usuários':  
            await seedUsers();  
            console.log('Seeds de usuários geradas com sucesso.');  
            break;  
        case 'Gerar Seeds de Eventos':  
            await seedEvents();  
            console.log('Seeds de eventos geradas com sucesso.');  
            break;  
        case 'Voltar ao Menu Principal':  
            menuPrincipal(userId);
    }  
}  