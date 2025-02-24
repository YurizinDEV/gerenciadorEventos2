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
                {name: 'Gerar Seeds de Usuários (10 Usuários)',  value: 'seedUsers'},
                {name: 'Gerar Seeds de Eventos (10 Eventos)',  value: 'seedEvents'},
                {name: 'Voltar ao Menu Principal',  value: 'menuPrincipal'}
            ],  
        },  
    ]);  

    switch (seedAction) {  
        case 'seedUsers': 
            await seedUsers();  
            console.log('Seeds de usuários geradas com sucesso.');  
            break;  
        case 'seedEvents':  
            await seedEvents();  
            console.log('Seeds de eventos geradas com sucesso.');  
            break;  
        case 'menuPrincipal':  
            menuPrincipal(userId);
    }  
    await menuSeeds(userId);
}  


   /*export async function menuSeeds2() {
        const { action } = await inquirer.prompt([
            {
                type: 'list',
                name: 'action',
                message: 'Selecione uma das opções:',
                choices: [
                    { name: '1 - Adicionar 10 usuários (Seed)', value: 'userSeed'  },
                    { name: '2 - Adicionar 10 eventos (Seed)' , value: 'eventSeed' },
                    { name: '3 - Voltar ao menu principal'    , value: 'back'      }
                ]
            }
        ])
    
        switch (action) {
            case 'userSeed':
                await seedUsers()
                break
            case 'eventSeed':
                await seedEvents()
                break
            case 'back':
                return
        }
    
        await menuSeeds2()
    }*/