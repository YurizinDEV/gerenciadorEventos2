// utils/userLogger.ts  
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { getCurrentTime } from '../utils/logUtils';
import { formatDate } from '../utils/dateUtils';

export const userLogFilePath: string = './data/user.log';

export async function createUserLog(action: string, username: string) {
    try {
        const eventString = `${getCurrentTime()} - ID: ${uuid()}, Usuário: ${username}, Data: ${formatDate(new Date())}, Ação: ${action}\n`;
        await fs.appendFileSync(userLogFilePath, eventString, 'utf-8');
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao escrever no arquivo de log de usuários: ${(error as Error).message}`);
    }
}