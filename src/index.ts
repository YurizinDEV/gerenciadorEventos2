import { criarTabelaUsuarios } from './services/userService';
import { criarTabelaEventos } from './services/eventService';
import { startCLI } from './cli/loginCli';

async function main() {
    criarTabelaUsuarios();
    criarTabelaEventos();
    setTimeout(() => {
        startCLI();
    }, 1200);
}

main().catch(err => {
    console.error(err);
});
