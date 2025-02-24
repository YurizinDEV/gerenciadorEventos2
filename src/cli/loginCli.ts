//loginCli

import inquirer from "inquirer";
import { db } from "../services/dbService";
import { Usuario } from "../models/userModel";
import { menuPrincipal } from "./menuCli";

// Função principal para iniciar a CLI
export async function startCLI() {
    console.log("\nBem-vindo(a) à CLI de Gerenciamento de Eventos e Usuários!\n");
    await loginFlow();
}

export async function loginFlow() {  
    const { email, senha } = await inquirer.prompt([  
        {  
            name: "email",  
            type: "input",  
            message: "Digite seu email:",  
        },  
        {  
            name: "senha",  
            type: "password",  
            message: "Digite sua senha:",  
            mask: "*",  
        },  
    ]);  

    // Verifica se o usuário existe no banco  
    db.get(  
        "SELECT * FROM usuarios WHERE email = ? AND senha = ?",  
        [email, senha],  
        async (err: Error, row: Usuario) => {  
            if (err) {  
                console.error("Erro ao verificar usuário:", err);  
                return;  
            }  
            if (!row) {  
                console.log("Credenciais inválidas. Tente novamente.\n");  
                await loginFlow();
            } else {  
                console.log(`\nLogin realizado com sucesso! Bem-vindo, ${row.nome}.\n`);  

                // Verifica se row.id não é undefined antes de passar o id para o menu principal (Tratamento realizado apenas para resolver erro de id não ser obrigatório na model mas é autoincrement no banco de dados) 
                if (row.id !== undefined) {
                    menuPrincipal(row.id);
                } else {
                    console.error("Erro: ID do usuário não encontrado.");
                }
            }  
        }  
    );  
}