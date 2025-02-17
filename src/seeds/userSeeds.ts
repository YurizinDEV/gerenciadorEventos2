import { faker } from '@faker-js/faker';
import { Usuario } from '../models/userModel'; 
import { inserirUsuarioService } from '../services/userService'; 

const NUM_USERS = 10; 

async function seedUsers() {
    for (let i = 0; i < NUM_USERS; i++) {
        const usuario: Usuario = {
            nome: faker.name.findName(),
            email: faker.internet.email(),
            senha: faker.internet.password(8), // Senha com pelo menos 8 caracteres  
        };

        await inserirUsuarioService(usuario.nome, usuario.email, usuario.senha);
        console.log(`Usuário criado: ${usuario.nome} - ${usuario.email}`);
    }
}

seedUsers()
    .then(() => console.log('Seeds de usuários concluídas.'))
    .catch((error) => console.error('Erro ao criar seeds de usuários:', error));