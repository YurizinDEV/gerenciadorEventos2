//logCli.ts  
import { createUserLog } from '../log/userLog';  
import { createEventLog } from '../log/eventLog';  

/*export async function logUserAction(action: string, username: string) {  
    await createUserLog(action, username);  
}  

export async function logEventAction(action: string, eventName: string) {  
    await createEventLog(action, eventName);  
}  */



export async function logUserAction(action: string, userId: number) {  
    await createUserLog(action, userId.toString()); 
}  

export async function logEventAction(action: string, eventName: string) {  
    await createEventLog(action, eventName);  
}