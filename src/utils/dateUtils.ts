//dateUtils.ts  
export function formatDate(date: Date): string {  
    return date.toLocaleDateString('pt-BR'); // Formato de data brasileiro  
}  
export function formatarData(timestamp: number): string {  
    const date = new Date(timestamp);  
    const ano = date.getFullYear(); // Obtém o ano  
    const mes = String(date.getMonth() + 1).padStart(2, '0'); // Obtém o mês (0-11) e adiciona 1  
    const dia = String(date.getDate() + 1).padStart(2, '0'); // Obtém o dia  

    return `${ano}-${mes}-${dia}`; // Retorna no formato yyyy_mm_dd  
}