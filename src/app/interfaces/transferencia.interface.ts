import { Destinatario } from './destinatario.interface';

export interface Transferencia {
    destinatario: Destinatario;
    monto: number;
    comentario: string;
}