export class Alvara {
    selecionado: boolean = false;
    id: number = 0;
    tipoDoc: any;
    nomeArquivo: string = '';
    numeroAlvara: string = '';
    nomeEmpresa: string = '';
    cnpjEmpresa: string = '';
    dataEmissao: Date | undefined;
    dataVencimento: Date | undefined;
    expira: number = 0;
    pdf: any;
    observacao: string = '';
    statusDocumento: any;
}