// utils/eventLogger.ts  
import fs from 'fs';
import { v4 as uuid } from 'uuid';
import { getCurrentTime } from '../utils/logUtils';
import { formatDate } from '../utils/dateUtils';

export const eventLogFilePath: string = './data/event.log';

export async function createEventLog(action: string, eventName: string) {
    try {
        const eventString = `${getCurrentTime()} - ID: ${uuid()}, Evento: ${eventName}, Data: ${formatDate(new Date())}, Ação: ${action}\n`;
        await fs.appendFileSync(eventLogFilePath, eventString, 'utf-8');
    } catch (error) {
        console.log(`${getCurrentTime()} - Erro ao escrever no arquivo de log de eventos: ${(error as Error).message}`);
    }
}