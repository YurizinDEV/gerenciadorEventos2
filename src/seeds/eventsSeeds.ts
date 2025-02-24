//eventsSeeds

import { faker } from '@faker-js/faker';
import { Evento } from '../models/eventModel';
import { adicionarEventoService, adicionarVariosEventosService } from '../services/eventService';
import { listarTodosUsuariosService } from '../services/userService';

export async function seedEvents() {
    try {
        const NUM_EVENTS = 10;
        const users = await listarTodosUsuariosService() || [];
        if (!users) {
            console.log('Nenhum usuário encontrado. Impossível criar eventos.');
            return;
        }
        if (users) {
            console.log('Iniciando a criação dos usuarios!');
            let eventos: Evento[] = [];
            for (let i = 0; i < NUM_EVENTS; i++) {
                const randomUserIndex = faker.number.int({ min: 0, max: users.length - 1 });
                const userId: number = users[randomUserIndex].id;
                const evento: Evento = {
                    nome: faker.company.catchPhraseAdjective() + ' ' + faker.company.buzzNoun(),
                    data: faker.date.future(),
                    criadoPor: userId
                };
                eventos.push(evento);
            }
            await adicionarVariosEventosService(eventos);
        }
    } catch (error) {
        console.log(`Erro ao inserir eventos: ${error}`);
    }
}  