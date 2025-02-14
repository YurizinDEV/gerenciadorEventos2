export interface Log {
    id: number;
    acao: string;
    tabela: string;
    usuarioId: number;
    dataHora: Date;
    descricao?: string;
}