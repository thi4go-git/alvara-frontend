export class GeralException extends Error {
    constructor(mensagem: string) {
        super(mensagem);
        this.name = 'GeralException';
    }
}