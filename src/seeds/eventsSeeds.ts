import { faker } from '@faker-js/faker';
import { Evento } from '../models/eventModel';
import { adicionarEventoService } from '../services/eventService';
import { listarTodosUsuariosService } from '../services/userService';
import uuid from 'uuid';

const NUM_EVENTS = 10;

async function seedEvents() {
    try {
        const users = await listarTodosUsuariosService()

        if (users.length === 0) {
            console.log(`Nenhum usuário encontrado. Impossível criar eventos.`)
            return
        }

        for (let i = 0; i < NUM_EVENTS; i++) {
            const randomUserIndex = faker.number.int({ min: 0, max: users.length - 1 })
            const userId = users[randomUserIndex].id

            const evento: Evento = {
                nome: faker.company.catchPhraseAdjective() + ' ' + faker.company.buzzNoun(),
                data: faker.date.future(),
                criadoPor: userId
            };

            await adicionarEventoService(evento.nome, evento.data, evento.usuario_id);
            console.log(`Evento criado: ${evento.nome} - ${evento.data}`);
        }
    } catch (error) {
        console.log(`Erro ao inserir evento: ${error}}`)
    }
    }

seedEvents()
        .then(() => console.log('Seeds de eventos concluídas.'))
        .catch((error) => console.error('Erro ao criar seeds de eventos:', error));


