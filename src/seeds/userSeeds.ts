//userSeeds

import { faker } from '@faker-js/faker';
import { Usuario } from '../models/userModel'; 
import { inserirUsuarioService } from '../services/userService'; 

const NUM_USERS = 10;  

export async function seedUsers() {  
    for (let i = 0; i < NUM_USERS; i++) {  
        const usuario: Usuario = {  
            nome: faker.name.fullName(),  
            email: faker.internet.email(),  
            senha: faker.internet.password({  
                length: 10, 
                memorable: false,  
                pattern: /[A-Za-z0-9!@#$%^&*(),.?":{}|<>]/,  
                prefix: 'A1@'
            }),  
        };  

        await inserirUsuarioService(usuario.nome, usuario.email, usuario.senha);  
        console.log(`Usuário criado: ${usuario.nome} - ${usuario.email}`);  
    }  
}  
