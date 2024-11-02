import { Exclude, Expose } from "class-transformer";

export class ResponseUsuarioDto {
    @Expose()
    id: number;

    @Expose()
    nome: string;

    @Expose()
    email: string;
    
    @Exclude({toPlainOnly: true})
    senha: string;
}